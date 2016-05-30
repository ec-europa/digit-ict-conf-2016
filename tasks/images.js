const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images:dist', () =>
  gulp.src('build/assets/images/**')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/assets/images'))
);
