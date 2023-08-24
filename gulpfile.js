'use strict'; // eslint-disable-line

let gulp = require('gulp');

const jsdoc = require('gulp-jsdoc3');




gulp.task('doc', function (cb) {
    gulp.src(['README.md', './framework/**/*.js'], {read: false})
        .pipe(jsdoc({}, cb));
});



gulp.task('default', gulp.series( 'doc'));
