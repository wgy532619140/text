// var gulp=require('gulp');
// var sass=require('gulp-sass')
// var clean=require('gulp-clean-css');
// var server=require('gulp-webserver');
// var uglify=require('gulp-uglify')//压缩js
var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer"); // 前缀
var clean = require("gulp-clean-css"); // 压缩
var concat = require("gulp-concat"); // 合并
var scss = require("gulp-sass"); // 编译scss
var server = require("gulp-webserver") //起服
var htmlmin = require("gulp-htmlmin") //压缩html
var imgmin = require("gulp-imagemin") //压缩图片
var uglify = require("gulp-uglify") //压缩js
var babel = require("gulp-babel") //转码
var rev = require("gulp-rev") //生成后缀
var collector = require("gulp-rev-collector") //替换文件路径
var url = require("url");
var path = require("path")
var fs = require("fs")

var list = require('./mon/data.json');

//编译
gulp.task("Sass", function() {
    return gulp.src(['./src/scss/*.scss', '!./src/scss/_mixin.scss', '!./src/scss/common.scss'])
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./src/css/'))
})

//起服
gulp.task("server", function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);
                if (pathname === "/favicon.ico") {
                    return res.end()
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                var filename = path.extname(pathname)
                if (filename) {
                    var filepath = path.join(__dirname, "src", pathname)
                    if (fs.existsSync(filepath)) {
                        res.end(fs.readFileSync(filepath))
                    }
                } else {
                    console.log(pathname);

                    res.end(JSON.stringify({ code: 0, msg: list }))
                }
            }
        }))
})



//监听
gulp.task("watch", function() {
    return gulp.watch('./src/scss/*.scss', gulp.series("Sass"))
})


// gulp.task("build", gulp.parallel("uglify", "copycss", "minhtml", "minimg"))
gulp.task("dev", gulp.series("Sass", "server", "watch"))


// //引入json

// //模块
// var fs=require('fs');
// var path=require('path');
// var url=require('url');
// //编译scss+压缩css
// gulp.task('devSass',function(){
//     return gulp.src('./src/scss/*.scss')
//     .pipe(sass())
//     .pipe(clean())
//     .pipe(gulp.dest('./src/css'))
// })
// //端口
// gulp.task('server',function(){
//     return gulp.src('src')
//     .pipe(server({
//         port:9090,
//         livereload:true,
// 		middleware:function(req,res,next){
// 			var pathname=url.parse(req.url).pathname;
// 			if(pathname==='/favicon.ico'){
// 				 res.end('')
// 			}
// 			if(pathname=='/list'){
// 				res.end(JSON.stringify({code:0,msg:list}))
// 			}else{
// 				pathname=pathname==='/'?'index.html':pathname,
// 				res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
// 			}
// 		}
//     }))
// })
// gulp.task('watch',function(){
//     return gulp.watch('./src/scss/*.scss',gulp.series('devSass'))
// })
// gulp.task('default',gulp.series('devSass','server','watch'))