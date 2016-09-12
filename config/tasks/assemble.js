var assemble = require('fabricator-assemble'),
    runSequence = require('run-sequence'),
    del = require('del'),
    handlebars = require('handlebars'),
    flatten = require('gulp-flatten');

require('dotenv').config();
//ASSEMBLE
module.exports = function (gulp, plugins) {
  return function () {
    gulp.task('assemble', function (cb) {
      runSequence(
          'buildmocks',
          'flatten',
          'del',
          cb
      );
    });

    gulp.task('del', function () {
      del(process.env.BUILD_PATH + 'tempmockups');
    });

    gulp.task('flatten', function () {
      gulp.src(process.env.BUILD_PATH + 'tempmockups/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest(process.env.BUILD_PATH + 'mockups'));
    });

    gulp.task('buildmocks', function () {
      var options = {
          layout: 'default',
          layouts: process.env.MOCK_LAYOUT,
          layoutIncludes: 'app/framework/includes/*.html',
          views: process.env.MOCK_PAGES,
          materials: process.env.MOCK_COMPONENTS,
          data: 'config/*.{json,yml}',
          docs: 'docs/**/*.md',
          keys: {
              materials: 'materials',
              views: 'views',
              docs: 'docs'
          },
          helpers: require('../../bower_components/knowit-ninja/helpers')(handlebars),
          logErrors: false,
          onError: function(error) {
            //console.log(error);
          },
          dest: process.env.BUILD_PATH + 'tempmockups'
      };

      return assemble(options);
    });
  };
};
