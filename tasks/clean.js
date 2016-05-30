const gulp = require('gulp');
const del = require('del');

gulp.task('clean:build', (cb) => {
  del(['build'], { dot: true })
  .then(() => cb());
});

gulp.task('clean:dist', (cb) => {
  del(['dist'], { dot: true })
  .then(() => cb());
});

gulp.task('clean', ['clean:build', 'clean:dist']);
