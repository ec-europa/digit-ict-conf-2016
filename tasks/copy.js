const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('copy:data', () => gulp.src(['./src/data/**'])
  .pipe(gulp.dest('./dist/data'))
);

gulp.task('copy:images', () => gulp.src(['./src/assets/images/**'])
  .pipe(gulp.dest('./dist/assets/images'))
);

gulp.task('copy:manifest', () => gulp.src(['./src/manifest.json'])
  .pipe(gulp.dest('./dist'))
);

gulp.task('copy:index', () => gulp.src(['./src/index.html'])
  .pipe(gulp.dest('./dist'))
);

gulp.task('copy', (cb) => runSequence(
  ['copy:data', 'copy:manifest', 'copy:index'],
  cb
));
