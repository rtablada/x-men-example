var gulp = require('gulp'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    mocha = require('gulp-mocha'),
    run = require('gulp-run'),
    _ = require('lodash');

function handleError(self, err) {
    self.emit('end');
};

gulp.task('mocha', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(run('clear'))
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', function(err) {
            handleError(this, err);
            notify.onError({ title: 'Fail', message: 'All your base are belong to us!'})(err);
        })
        .pipe(notify({ title: 'Success', message: 'Your tests passed!'}));
});

gulp.task('watch', function() {
    return gulp.watch(['tests/**/*.js', 'app/**/*.js'], ['mocha']);
});

gulp.task('default', ['watch', 'mocha']);
