'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var source2 = require('vinyl-source-stream2');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var factor = require('factor-bundle');
var path = require('path');
var concat = require('concat-stream');
var file = require('gulp-file');
var gulpif = require('gulp-if');
var minimist = require('minimist');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var fs = require('fs');
var rev = require('gulp-rev');
var buffer1 = require('gulp-buffer');

var PROD = 'prod';
//获取参数变量
var args = minimist(process.argv.slice(2), {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'dev'}
});





//使用factor bundle + watchify + 页面require + dev/prod环境 
gulp.task('browserify',function() {
    console.info('browserify task');
    if(args.env === PROD) {
        return browserifyProdTask();
    }else {
        return browserifyDevTask();
    }
});


//dev环境，不使用factor-bundle，直接压成一个bundle.js即可
//使用：watchify + require
function browserifyDevTask() {

    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: false,
        entries: ['./public/js/common/main.js'],
        debug: true
    });

    var w = watchify(b);

    w.require('./public/js/individual/page1.js',{expose:'page1'});
    w.require('./public/js/individual/page2.js',{expose:'page2'});
    w.require('./public/js/individual/page3.js',{expose:'page3'});

    var bundle = function() {
  
        w.bundle()
         .pipe(source2('extrabux.bundle.js'))
         .pipe(gulp.dest('./public/dist'));
        
        return w;
    };

    w.on('update', bundle);
    w.on('log', gutil.log);

    return bundle();
    
}


//生产环境，去除watchify后均正常
//使用： factor-bundle + unlify + require + rev
function browserifyProdTask() {

    var b = browserify({
        entries: ['./public/js/common/main.js', './public/js/individual/main.js'],
        debug: true
    });
 
    
    var bundle = function() {

        b.require('./public/js/individual/page1.js',{expose:'pagename1'});
        b.require('./public/js/individual/page2.js',{expose:'pagename2'});
        b.require('./public/js/individual/page3.js',{expose:'pagename3'});
        
        b.plugin('factor-bundle', {
            e:['./public/js/common/main.js','./public/js/individual/main.js'],
            o:[write('extrabux.common.js'),write('extrabux.individual.js')]
        })
            
            .bundle()
            .pipe(write('extrabux.external.js'));

        return b;
    };

    function write(filepath) {
        return concat(function (content) {
            return file(path.basename(filepath), content, { src: true })
               // .pipe(uglify())
                .pipe(gulp.dest('./public/dist'));
                
        });
    }

    return bundle();
    
}



gulp.task('rev',function() {
    
    return gulp.src(['./public/dist/*.js'])
     //   .pipe(gulp.dest('./public/rev'))  
        .pipe(rev())
        .pipe(gulp.dest('./public/rev'))  
        .pipe(rev.manifest())
        .pipe(gulp.dest('./'));  
});

// Default task
gulp.task('default', ['browserify','rev'], function () {
    gulp.start();
});