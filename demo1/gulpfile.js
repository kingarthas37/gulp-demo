var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');



var watchify = require('watchify');


gulp.task('default',function() {
    gulp.start('base');
});


//基础实例
//uglify,concat,minifyCss,sass,imagemin
gulp.task('base', function () {
    
    gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
    
    gulp.src('public/css/*.css')
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'));
    
    gulp.src('public/css/*.scss')
        .pipe(sass())
        .pipe(concat('scss.css'))
        .pipe(gulp.dest('dist'));
    
    gulp.src('public/images/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist'));
    
});
 