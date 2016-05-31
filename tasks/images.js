const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const responsive = require('gulp-responsive');

gulp.task('images:build', () =>
  gulp.src('src/assets/images/**/*.{png,jpg}')
    .pipe(responsive({
      'speakers/*': [
        {
          width: 200,
          height: 200,
        }, {
          width: 200 * 2,
          height: 200 * 2,
          rename: {
            suffix: '@2x',
          },
        },
      ],
      '*': {},
    }, {
      errorOnUnusedImage: false,
      withoutEnlargement: false,
      crop: 'center',
    }))
    .pipe(gulp.dest('build/assets/images'))
);

gulp.task('images:dist', () =>
  gulp.src('build/assets/images/**')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/assets/images'))
);
