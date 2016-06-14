const gulp = require('gulp');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const babel = require('rollup-plugin-babel');
const uglify = require('gulp-uglify');
const path = require('path');

gulp.task('scripts:build:redux', () => rollup({
  entry: 'node_modules/redux/src/index.js',
  plugins: [
    babel({
      presets: ['es2015-loose-rollup', 'stage-0'],
      babelrc: false,
    }),
    nodeResolve({
      jsnext: false,
      main: true,
      browser: true,
    }),
    commonjs({
      ignoreGlobal: true,
    }),
  ],
}).then((bundle) => bundle.write({
  dest: '.tmp/redux.js',
  format: 'cjs',
})));

gulp.task('scripts:build:app', ['scripts:build:redux'], () => rollup({
  entry: 'src/app.js',
  plugins: [
    {
      resolveId: (id) => {
        if (id === 'redux') {
          return path.resolve('.tmp/redux.js');
        }
      },
    },
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-loose-rollup', 'stage-0'],
      babelrc: false,
      plugins: [
        'syntax-object-rest-spread',
        'transform-object-rest-spread',
        'transform-class-properties',
        'transform-decorators-legacy',
        ['transform-es2015-classes', { loose: true }],
        ['transform-react-jsx', { pragma: 'h' }],
      ],
    }),
    nodeResolve({
      jsnext: false,
      main: true,
      browser: true,
    }),
    commonjs({
      ignoreGlobal: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
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
