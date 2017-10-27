
// var gulp = require('gulp');
// var sass = require('gulp-sass');

// // 编译sass
// // 利用gulp任务来编译
// // 创建gulp任务：gulp.task()
// gulp.task('compileSass',function(){

//     gulp.src('./src/sass/*.scss')

//         .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))

//         .pipe(gulp.dest('./src/css/'));
// });


// gulp.task('jtSass',function(){
//     gulp.watch('./src/sass/*.scss',['compileSass']);
// });

/* 
* @Author: Marte
* @Date:   2017-09-23 11:27:19
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-14 10:36:34
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"
    });
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("src/**/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);