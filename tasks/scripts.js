const gulp = require('gulp');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('gulp-uglify');

gulp.task('scripts:build:app', () => rollup({
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
  dest: 'build/app.js',
  sourceMap: true,
})));

gulp.task('scripts:build:vendors', () => rollup({
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
  dest: 'build/assets/scripts/vendors.js',
  sourceMap: true,
})));

gulp.task('scripts:build', ['scripts:build:app', 'scripts:build:vendors']);

gulp.task('scripts:dist', () => gulp.src('./build/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
);
