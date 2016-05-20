const gulp = require('gulp');
const runSequence = require('run-sequence');

// Get tasks from tasks directory
require('require-dir')('tasks');

gulp.task('default', (cb) => runSequence(
  'clean',
  ['handlebars', 'sass', 'copy', 'rollup'],
  cb
));
