const gulp = require('gulp');
const runSequence = require('run-sequence');

// Get tasks from tasks directory
require('require-dir')('tasks');

gulp.task('build', (cb) => runSequence(
  'clean:build',
  ['copy:build', 'styles:build', 'scripts:build', 'images:build'],
  cb
));

gulp.task('dist', ['build'], (cb) => runSequence(
  'clean:dist',
  ['copy:dist', 'styles:dist', 'scripts:dist', 'images:dist'],
  'manifest',
  cb
));
