const gulp = require('gulp');
const hb = require('gulp-hb');

gulp.task('handlebars', () => gulp
  .src('./src/*.html')
  .pipe(hb({
    partials: './src/assets/partials/**/*.hbs',
    data: './src/data/**/*.{js,json}',
  }))
  .pipe(gulp.dest('./dist'))
);
