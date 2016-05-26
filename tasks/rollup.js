const gulp = require('gulp');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

gulp.task('rollup', () => rollup({
  entry: 'src/assets/scripts/app.js',
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
  dest: 'dist/assets/scripts/app.js',
  sourceMap: true,
})))
