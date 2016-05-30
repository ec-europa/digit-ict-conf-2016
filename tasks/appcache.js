const gulp = require('gulp');
const manifest = require('gulp-manifest');

gulp.task('manifest', () => {
  gulp.src(['dist/**/*'], { base: './dist/' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'app.manifest',
      exclude: 'app.manifest',
    }))
    .pipe(gulp.dest('dist'));
});
