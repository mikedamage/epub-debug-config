import gulp        from 'gulp';
import plugins     from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import path        from 'path';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';

const $          = plugins();
const production = !!$.util.env.production;
const copyFiles  = [
  'source/**/*',
  '!source/js/**/*.{js,jsx}',
  '!source/css/**/*.scss'
];

gulp.task('scripts:main', () => {
  let bundler = browserify({
    entries: './source/js/main.js',
    extensions: [ '.js', '.jsx' ],
    debug: !production
  })
  .transform(babelify);

  return bundler.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('scripts:content', () => {
  let bundler = browserify({
    entries: './source/js/content.js',
    extensions: [ '.js', '.jsx' ],
    debug: !production
  })
  .transform(babelify);

  return bundler.bundle()
    .pipe(source('content.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('scripts', [
  'scripts:main',
  //'scripts:content'
]);

gulp.task('styles', () => {
  return gulp.src('./source/css/**/*.scss')
    .pipe($.sass({
      outputStyle: 'expanded',
      includePath: [
        'source/css',
        path.join(__dirname, 'node_modules')
      ]
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('copy', () => gulp.src(copyFiles).pipe(gulp.dest('build')));

gulp.task('default', cb => {
  runSequence('copy', [ 'images', 'scripts', 'styles' ], cb);
});
