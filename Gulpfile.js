var gulp = require('gulp'),
    watch = require('gulp-watch'),
    mocha = require('gulp-mocha');

gulp.task('tests', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', function() {
    watch(['tests/**/*.js', 'app/**/*.js'], ['tests']);
});

gulp.task('default', ['tests', 'watch']);
