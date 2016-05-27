const gulp = require('gulp');

gulp.task('copy:build:data', () => gulp.src(['./src/data/**'])
  .pipe(gulp.dest('./build/data'))
);

gulp.task('copy:build:manifest', () => gulp.src(['./src/manifest.json'])
  .pipe(gulp.dest('./build'))
);

gulp.task('copy:build:index', () => gulp.src(['./src/index.html'])
  .pipe(gulp.dest('./build'))
);

gulp.task('copy:build:images', () => gulp.src(['./src/assets/images/**'])
  .pipe(gulp.dest('./build/assets/images'))
);

gulp.task('copy:dist:data', () => gulp.src(['./src/data/**'])
  .pipe(gulp.dest('./dist/data'))
);

gulp.task('copy:dist:manifest', () => gulp.src(['./src/manifest.json'])
  .pipe(gulp.dest('./dist'))
);

gulp.task('copy:dist:index', () => gulp.src(['./src/index.html'])
  .pipe(gulp.dest('./dist'))
);

gulp.task('copy:build', [
  'copy:build:data',
  'copy:build:manifest',
  'copy:build:index',
  'copy:build:images',
]);

gulp.task('copy:dist', [
  'copy:dist:data',
  'copy:dist:manifest',
  'copy:dist:index',
]);
