var gulp     = require('gulp'),
webdriver    = require('gulp-webdriver');

/*******************************************************************************
** Tests
*******************************************************************************/

gulp.task('test', function(){
    return gulp.src('test/spec/**/*.js', {read: false})
        .pipe(webdriver({
            desiredCapabilities: {
              browserName: 'phantomjs'
            }
    }));
});
