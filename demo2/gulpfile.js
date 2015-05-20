'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var uglify = require('gulp-uglify');
var factor = require('factor-bundle');
 

//最基本使用gulp -> browserify
/*
gulp.task('default', function() {
    return browserify('./public/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/dist/'));
});
*/


//标准使用factor-bundle，没有使用watch-file与性能优化

//gulp.task('default', function() {
//    return browserify({
//        entries: ['./public/js/common/main.js', './public/js/individual/main.js']
//    })
//        .plugin(factor, {
//            o: ['./public/dist/extrabux.common.js', './public/dist/extrabux.individual.js']
//        })
//        .bundle()
//        .pipe(source('extrabux.external.js'))
//        .pipe(gulp.dest('./public/dist/'));
//});


 




gulp.task('default',function() {

    var browserifyArgs = {
        cache: {}, packageCache: {}, fullPaths: true,
        entries: ['./public/js/common/main.js', './public/js/individual/main.js'],
        debug: true
    };

    var bundler = watchify(browserify(browserifyArgs));
    
    var bundle = function() {
        return bundler
            .plugin(factor, { o: ['./public/dist/extrabux.common.js', './public/dist/extrabux.individual.js'] })
            .bundle()
            .pipe(source('extrabux.external.js'))
            .pipe(gulp.dest('./public/dist/'));
    };
    
    bundler.on('update', bundle);
    
    return bundle();
    
});

 