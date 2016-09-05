/**
 * Require Browsersync
 */
const browserSync = require('browser-sync');
const history = require('connect-history-api-fallback');
const path = require('path');

/**
 * Run Browsersync
 */
browserSync({
  server: {
    baseDir: path.resolve(process.cwd(), ''),
    middleware: [
      history({
        index: '/build/index.html',
      }),
    ],
  },
  open: 'external',
  https: true,
});
