const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const history = require('connect-history-api-fallback');

gulp.task('js-watch', ['scripts:build'], () => browserSync.reload('*.js'));
gulp.task('styles-watch', ['styles:build'], () => browserSync.reload('*.css'));
gulp.task('html-watch', ['copy:build:index'], () => browserSync.reload());
gulp.task('data-watch', ['copy:build:data'], () => browserSync.reload());
gulp.task('images-watch', ['copy:build:images'], () => browserSync.reload());

gulp.task('serve:build', () => {
  browserSync.init({
    server: {
      baseDir: './build/',
      middleware: [history()],
    },
  });

  gulp.watch('src/**/*.js', ['js-watch']);
  gulp.watch('src/**/*.scss', ['styles-watch']);
  gulp.watch('src/**/*.html', ['html-watch']);
  gulp.watch('src/data/**/*.json', ['data-watch']);
  gulp.watch('src/assets/images/**', ['images-watch']);
});


gulp.task('serve:dist', () => {
  browserSync.init({
    server: {
      baseDir: './dist/',
      middleware: [history()],
    },
  });
});
