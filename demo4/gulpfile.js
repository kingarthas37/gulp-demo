'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');


gulp.task('default', function() {
    
    var b = browserify({
        entries:['./js/main.js']
    });
    
    b.add('./js/main1.js');

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./'));
    
});