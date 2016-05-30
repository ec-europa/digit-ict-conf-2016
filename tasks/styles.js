const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const uncss = require('gulp-uncss');
const connect = require('gulp-connect');
const history = require('connect-history-api-fallback');

gulp.task('styles:build', () => gulp.src('./src/assets/styles/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['node_modules'],
    precision: 10,
  }).on('error', sass.logError))
  .pipe(postcss([autoprefixer({
    browsers: ['last 2 versions'],
  })]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./build/assets/styles'))
);


gulp.task('styles:dist', () => {
  const processors = [
    cssnano(),
  ];

  connect.server({
    root: './build',
    port: 3000,
    livereload: false,
    middleware: () => [history()],
  });

  return gulp.src('./build/assets/styles/**/*.css')
    .pipe(uncss({
      html: [
        'http://localhost:3000/',
        'http://localhost:3000/speakers',
        'http://localhost:3000/programme',
      ],
      ignore: [
        '.mdl-layout__header',
        '.mdl-layout__drawer-button',
        '.mdl-layout__header .mdl-layout__drawer-button',
        '.mdl-layout__drawer',
        '.is-visible',
        '.mdl-layout__drawer.is-visible',
      ],
    })).on('end', () => { connect.serverClose(); })
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/assets/styles/'));
});
