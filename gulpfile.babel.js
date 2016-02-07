import fs          from 'fs';
import gulp        from 'gulp';
import plugins     from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import path        from 'path';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import buffer      from 'vinyl-buffer';
import del         from 'del';
import pkg         from './package';
import manifest    from './source/manifest';

const $            = plugins();
const production   = !!$.util.env.production;
const versionFiles = [ './package.json', './source/manifest.json' ];
const copyFiles    = [
  'source/**/*',
  '!source/js/**/*.{js,jsx}',
  '!source/css/**/*.scss'
];

const bumpTask = type => {
  return () => {
    return gulp.src(versionFiles)
      .pipe($.bump({ type: type }))
      .pipe(gulp.dest('./'));
  };
};

gulp.task('bump:patch', bumpTask('patch'));
gulp.task('bump:minor', bumpTask('minor'));
gulp.task('bump:major', bumpTask('major'));

gulp.task('version', cb => {
  $.util.log('%s %s', $.util.colors.bold.blue('Current Version:'), $.util.colors.bold.white(pkg.version));
  cb();
});

const bundleJS = input => {
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
    .pipe($.if(production, $.uglify()))
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
    .pipe($.rename(file => file.dirname = `epub-debug-logger/${file.dirname}`))
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

gulp.task('release', [ 'crx' ], () => {
  let s3 = $.s3Upload({
    accessKeyId: 'AKIAJ3VW4PJMT6HI3Z3Q',
    secretAccessKey: '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'
  });

  return gulp.src('dist/*')
    .pipe(s3({
      Bucket: 'mikegreen/epub-debug-config',
      ACL: 'public-read'
    }))
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
