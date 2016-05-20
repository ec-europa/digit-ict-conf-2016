const gulp = require('gulp');
const del = require('del');

gulp.task('clean', (cb) => {
  del(['dist'], {
    dot: true,
  })
  .then(() => cb());
});
