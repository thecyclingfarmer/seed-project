const runSequence = require('run-sequence');
const flatten = require('gulp-flatten');

module.exports = (gulp, plugins) => {
  return () => {
    //COPY
    gulp.task('copy', (cb) => {
      runSequence(
          ['copy.images', 'copy.fonts'],
          cb
      );
    });

    //COPY.IMAGES
    gulp.task('copy.images', (cb) => {
      gulp.src('./app/framework/images/**/*', { base: './app/framework/images' })
        .pipe(gulp.dest(process.env.BUILD_PATH + 'images'));
      cb();
    });

    //COPY.FONTS
    gulp.task('copy.fonts', (cb) => {
      gulp.src('./app/framework/fonts/**/*', { base: './app' })
        .pipe(gulp.dest(process.env.BUILD_PATH + 'fonts'));
      cb();
    });
  };
};
