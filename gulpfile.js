const fs          = require('fs');
const gulp        = require('gulp');
const $           = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const path        = require('path');
const browserify  = require('browserify');
const babelify    = require('babelify');
const source      = require('vinyl-source-stream');
const buffer      = require('vinyl-buffer');
const del         = require('del');
const pkg         = require('./package');
const manifest    = require('./source/manifest');

const production   = !!$.util.env.production;
//const versionFiles = [ './package.json', './source/manifest.json' ];
const copyFiles    = [
  'source/**/*',
  '!source/js/**/*.{js,jsx}',
  '!source/css/**/*.scss'
];

const bumpTask = (file, type) => {
  let dest = file === 'package.json' ? './' : './source';

  return () => {
    return gulp.src(file)
      .pipe($.bump({ type: type }))
      .pipe(gulp.dest(dest));
  };
};

gulp.task('bump:patch:package', bumpTask('package.json', 'patch'));
gulp.task('bump:patch:manifest', bumpTask('source/manifest.json', 'patch'));
gulp.task('bump:patch', [ 'bump:patch:package', 'bump:patch:manifest' ]);

gulp.task('bump:minor:package', bumpTask('package.json', 'minor'));
gulp.task('bump:minor:manifest', bumpTask('source/manifest.json', 'minor'));
gulp.task('bump:minor', [ 'bump:minor:package', 'bump:minor:manifest' ]);

gulp.task('bump:major:package', bumpTask('package.json', 'major'));
gulp.task('bump:major:manifest', bumpTask('source/manifest.json', 'major'));
gulp.task('bump:major', [ 'bump:major:package', 'bump:major:manifest' ]);

gulp.task('version', (cb) => {
  $.util.log(`${$.util.colors.bold.blue('Current Version:')} ${$.util.colors.bold.white(pkg.version)}`);
  cb();
});

const bundleJS = (input) => {
  let output = path.basename(input);

  return browserify({
    entries: input,
    extensions: [ '.js', '.jsx' ],
    debug: !production,
    paths: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'source', 'js')
    ]
  }).transform(babelify)
    .bundle()
    .pipe(source(output))
    .pipe(buffer())
    .pipe($.rename({ extname: '.js' }))
    //.pipe($.if(production, $.uglify()))
    .pipe($.size({ title: `JS Bundle: ${output}` }))
    .pipe(gulp.dest('build/js'));
};

gulp.task('scripts:content', () => bundleJS('./source/js/content.js'));
gulp.task('scripts:popup', () => bundleJS('./source/js/popup.jsx'));

gulp.task('scripts', [
  'scripts:popup',
  'scripts:content'
]);

gulp.task('clean', () => del('build'));

gulp.task('styles', () => {
  return gulp.src('./source/css/**/*.scss')
    .pipe($.sass({
      outputStyle: 'expanded',
      includePaths: [
        'source/css',
        path.join(__dirname, 'node_modules')
      ]
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy', () => gulp.src(copyFiles).pipe(gulp.dest('build')));

gulp.task('zip', () => {
  let zipFile = `epub-debug-logger_${pkg.version}.zip`;

  return gulp.src('build/**/*')
    .pipe($.rename((file) => file.dirname = `epub-debug-logger/${file.dirname}`))
    .pipe($.zip(zipFile))
    .pipe($.size({ title: zipFile }))
    .pipe(gulp.dest('dist'));
});

gulp.task('crx', () => {
  return gulp.src('build')
    .pipe($.crxPack({
      privateKey: fs.readFileSync('./build.pem', 'utf8'),
      filename: `epub-debug-config.crx`,
      codebase: manifest.codebase,
      updateXmlFilename: 'update.xml'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', [ 'fonts:materialIcons' ]);

gulp.task('fonts:materialIcons', () => {
  let fontGlob = path.join(__dirname, 'node_modules', 'material-design-iconic-font', 'dist', 'fonts', '*');

  return gulp.src(fontGlob)
    .pipe($.size({ title: 'Material Design Iconic Font' }))
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('buildsize', () => {
  return gulp.src('./build/**/*')
    .pipe($.size({ title: 'Build Folder' }));
});

gulp.task('default', cb => {
  runSequence(
    'clean',
    [ 'copy', 'fonts' ],
    [ 'scripts', 'styles' ],
    'buildsize',
    cb
  );
});

gulp.task('watch', () => {
  gulp.watch('./source/**/*.{js,jsx}', [ 'scripts' ]);
  gulp.watch(copyFiles, [ 'copy' ]);
  gulp.watch('./source/css/**/*.scss', [ 'styles' ]);
});
