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

const $          = plugins();
const production = !!$.util.env.production;
const copyFiles  = [
  'source/**/*',
  '!source/js/**/*.{js,jsx}',
  '!source/css/**/*.scss'
];

const bumpTask = type => {
  return () => {
    return gulp.src('package.json')
      .pipe($.bump({ type: type }))
      .pipe(gulp.dest('./'));
  };
};

gulp.task('bump:patch', bumpTask('patch'));
gulp.task('bump:minor', bumpTask('minor'));
gulp.task('bump:major', bumpTask('major'));

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
  return gulp.src('build/**/*')
    .pipe($.rename(file => file.dirname = `epub-debug-logger/${file.dirname}`))
    .pipe($.zip(`epub-debug-logger-${pkg.version}.zip`))
    .pipe($.size({ title: 'Zip Archive' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', [ 'fonts:materialIcons' ]);

gulp.task('fonts:materialIcons', () => {
  let fontGlob = path.join(__dirname, 'node_modules', 'material-design-iconic-font', 'dist', 'fonts', '*');

  return gulp.src(fontGlob)
    .pipe($.size({ title: 'Material Design Iconic Font' }))
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('default', cb => {
  runSequence(
    'clean',
    [ 'copy', 'fonts' ],
    [ 'scripts', 'styles' ],
    cb
  );
});

gulp.task('watch', () => {
  gulp.watch('./source/**/*.{js,jsx}', [ 'scripts' ]);
  gulp.watch(copyFiles, [ 'copy' ]);
  gulp.watch('./source/css/**/*.scss', [ 'styles' ]);
});
