import gulp        from 'gulp';
import plugins     from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import path        from 'path';
import browserify  from 'browserify';
import babelify    from 'babelify';
import source      from 'vinyl-source-stream';
import del         from 'del';

const $          = plugins();
const production = !!$.util.env.production;
const copyFiles  = [
  'source/**/*',
  '!source/js/**/*.{js,jsx}',
  '!source/css/**/*.scss'
];

const bundleJS = input => {
  let output = path.basename(input);

  return browserify({
    entries: input,
    extensions: [ '.js', '.jsx' ],
    debug: !production
  }).transform(babelify)
    .bundle()
    .pipe(source(output))
    .pipe(gulp.dest('build/js'));
};

gulp.task('scripts:background', () => bundleJS('./source/js/background.js'));
gulp.task('scripts:content', () => bundleJS('./source/js/content.js'));
gulp.task('scripts:popup', () => bundleJS('./source/js/popup.jsx'));

gulp.task('scripts', [
  'scripts:background',
  //'scripts:content',
  //'scripts:popup'
]);

gulp.task('clean', () => del('build'));

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
  runSequence('clean', 'copy', [ 'scripts', 'styles' ], cb);
});
