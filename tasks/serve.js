const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('js-watch', ['rollup'], () => browserSync.reload('*.js'));
gulp.task('sass-watch', ['sass'], () => browserSync.reload('*.css'));

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
  });

  gulp.watch('src/**/*.js', ['js-watch']);
  gulp.watch('src/**/*.scss', ['sass-watch']);
});
