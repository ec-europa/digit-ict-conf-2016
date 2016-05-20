const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

gulp.task('sass', () => gulp.src('./src/assets/styles/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['node_modules'],
    precision: 10,
  }).on('error', sass.logError))
  .pipe(postcss([autoprefixer({
    browsers: ['last 2 versions'],
  })]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/assets/styles'))
);
