'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var source2 = require('vinyl-source-stream2')
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var factor = require('factor-bundle');
var path = require('path');
var concat = require('concat-stream');
var file = require('gulp-file');


//最基本使用gulp -> browserify
/*
gulp.task('default', function() {
    return browserify('./public/js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/dist/'));
});
*/


//标准使用factor-bundle，没有使用watchify

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
            .plugin(factor, {o:[write('./public/dist/extrabux.common.js'),write( './public/dist/extrabux.individual.js')]})
            .bundle()
            .pipe(write('extrabux.external.js'));
           // .pipe(_source('extrabux.external.js'))
           // .pipe(uglify())
           // .pipe(gulp.dest('./public/dist/'));
    };
    
    bundler.on('update', bundle);
    bundler.on('log', gutil.log);
    
//    bundler.on('factor.pipeline', function (id, pipeline) {
//        pipeline.get('wrap').push(write(id));
//    });
    
    return bundle();
    
});


function write(filepath) {
    return concat(function (content) {
        return file(path.basename(filepath), content, { src: true })
            //.pipe(uglify())
            .pipe(gulp.dest('./public/dist/'))
    });
}