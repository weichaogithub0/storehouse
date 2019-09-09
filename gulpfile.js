const gulp = require('gulp'); //引入gulp模块  gulp对象
const html = require('gulp-minify-html'); //引入gulp-minify-html模块。
const css = require('gulp-minify-css'); //引入gulp-minify-css模块。
const uglifyjs = require('gulp-uglify');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const babel = require('gulp-babel'); //es6转es5主要模块
const bablecore = require('babel-core'); //es6转es5主要模块
const es2015 = require('babel-preset-es2015'); //es6转es5主要模块
const imagemin=require('gulp-imagemin');
//1.简单的gulp任务
// gulp.task('default',function(){//default默认的任务名，编译的时候只需要写gulp
//     console.log('hello,gulp');
// });

//2.文件的复制
gulp.task('copyfile', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

//3.html文件的压缩。
gulp.task('uglifyhtml', function () {
    return gulp.src('src/*.html')
        .pipe(html())//执行html压缩
        .pipe(gulp.dest('dist/'))//输出,没有自动创建
});

//4.css文件的压缩。
gulp.task('uglifycss', function () {
    return gulp.src('src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/css/'));
});

//5.js的压缩
gulp.task('uglifyjs', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));
});

//6.监听
gulp.task('default', function () {
    watch(['src/*.html', 'src/css/*.css', 'src/js/*.js'], gulp.parallel('uglifyhtml', 'uglifycss', 'uglifyjs'));
    //watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
    //gulp.parallel() –并行运行任务 
});

//7.sass编译成css
gulp.task('runsass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        })) //执行编译,compressed:压缩一行
        .pipe(gulp.dest('dist/css/'));
});

//8.分开实现js代码的转码和压缩
//es6转es5
//现将es6代码转换成es5才能进行相关的压缩合并操作。
//gulp-babel@7   @后面的数字代表版本
//gulp-babel@7  babel-core   babel-preset-es2015
gulp.task('babel', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist/js/'));
});











//1.gulp.task(任务名称,回调函数); 默认的任务名称：default
//2.gulp.src() : 引入文件的目录,路径
//3.pipe:管道流
//4.gulp.dest() : 输出文件目录设置,如果目录不存在，自动创建。

