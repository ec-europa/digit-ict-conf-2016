const gulp = require('gulp');
const runSequence = require('run-sequence');

// Get tasks from tasks directory
require('require-dir')('tasks');

gulp.task('build', (cb) => runSequence(
  'clean:build',
  ['styles:build', 'copy:build', 'scripts:build'],
  cb
));

gulp.task('dist', ['build'], (cb) => runSequence(
  'clean:dist',
  ['copy:dist', 'styles:dist', 'scripts:dist', 'images:dist'],
  cb
));
