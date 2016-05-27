const gulp = require('gulp');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

gulp.task('rollup:vendors', () => rollup({
  entry: 'src/assets/scripts/vendors.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup'],
    }),
  ],
}).then((bundle) => bundle.write({
  format: 'iife',
  dest: 'dist/assets/scripts/vendors.js',
  sourceMap: true,
})));

gulp.task('rollup:app', () => rollup({
  entry: 'src/app.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup'],
    }),
  ],
}).then((bundle) => bundle.write({
  format: 'iife',
  dest: 'dist/app.js',
  sourceMap: true,
})));

gulp.task('rollup', ['rollup:app', 'rollup:vendors']);
