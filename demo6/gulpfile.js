var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var concatCss = require('gulp-concat-css');
var cssUrlVersion = require('gulp-css-urlversion');
var clean = require('gulp-clean');
var rename = require('gulp-rename');


gulp.task('default',function() {
    gulp.start(['sprite','css','images','concat','cssurl']);
});



//基础实例
//uglify,concat,minifyCss,sass,imagemin
gulp.task('sprite',['clean'], function () {
    
    var spriteData = gulp.src('./public/images/sprites/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        imgPath: '../images/sprite.png',
        cssVarMap: function(sprite) {
            
        }
        
    }));

    var imgStream = spriteData.img
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
    

    var cssStream = spriteData.css
         
     //   .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));

    return merge(imgStream, cssStream);
   
});




gulp.task('css', ['clean'],function () {
    return gulp.src('public/css/*.scss')
        .pipe(sass())
      //  .pipe(cssUrlVersion())
       // .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(concat('scss.css'))
        .pipe(gulp.dest('dist/css'));
    
});


gulp.task('images',['clean'],function() {
    return gulp.src('public/images/*.jpg')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('concat',['css','sprite','images','clean'], function () {
    return gulp.src('dist/css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('dist/css'));
});



gulp.task('clean', function () {
    console.info('clean...');
    return gulp.src('dist', {force: true})
        .pipe(clean());
});



gulp.task('cssurl',['concat'],function() {

    return gulp.src('dist/css/bundle.css')
        .pipe(cssUrlVersion())
        .pipe(rename({
            suffix:'.min'
        }))
        // .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
    
});