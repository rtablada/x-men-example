var gulp = require('gulp'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    mocha = require('gulp-mocha'),
    _ = require('lodash');

gulp.task('mocha', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'nyan' }))
        .on('error', notify.onError(testNotification('fail', 'mocha')))
        .pipe(notify(testNotification('pass', 'mocha')));
});

gulp.task('watch', function() {
    watch(['tests/**/*.js', 'app/**/*.js'], ['mocha']);
});

gulp.task('default', ['mocha', 'watch']);


function testNotification(status, pluginName) {
    var options = {
        title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
        message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
        icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
    };
    return options;
}
