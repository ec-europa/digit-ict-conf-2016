const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('copy:data', () => gulp.src(['./src/data/**'])
  .pipe(gulp.dest('./dist/data'))
);

gulp.task('copy:partials', () => gulp.src(['./src/assets/partials/**'])
  .pipe(gulp.dest('./dist/assets/partials'))
);

gulp.task('copy', (cb) => runSequence(
  ['copy:data', 'copy:partials'],
  cb
));
