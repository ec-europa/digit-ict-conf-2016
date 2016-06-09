const gulp = require('gulp');
const manifest = require('gulp-manifest');

gulp.task('manifest:build', () => {
  gulp.src(['build/**/*'], { base: './build/' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      filename: 'app.manifest',
      exclude: 'app.manifest',
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('manifest:dist', () => {
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
