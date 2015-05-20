var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var transform = require('vinyl-transform');

var browserify = require('browserify');

var watchify = require('watchify');
var gutil = require('gulp-util');


gulp.task('default',function() {
    gulp.start('browserify1');
});


//基础实例1
//uglify,concat,minifyCss,sass,imagemin
gulp.task('base1', function () {
    
    gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'));
    
    gulp.src('public/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('build'));
    
    gulp.src('public/css/*.scss')
        .pipe(sass())
        .pipe(concat('scss.css'))
        .pipe(gulp.dest('build'));
    
    gulp.src('public/images/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build'));
    
});


//browserify实例1 配合vinyl压缩js
gulp.task('browserify1', function() {
    return browserify('./public/js/a.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./build/'));
});



gulp.task('watch',function() {
    
    var bundler = watchify(browserify('./public/js/a.js', watchify.args));
    
    bundler.transform('brfs');
    bundler.on('update', rebundle);
    
    console.log('');
    
    function rebundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./build/'));
    }

    return rebundle();
    
});