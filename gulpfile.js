var gulp=require('gulp');
var sass=require('gulp-sass')
var clean=require('gulp-clean-css');
var server=require('gulp-webserver');
var uglify=require('gulp-uglify')//压缩js
//引入json
var list=require('./mon/data.json');
//模块
var fs=require('fs');
var path=require('path');
var url=require('url');
//编译scss+压缩css
gulp.task('devSass',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(clean())
    .pipe(gulp.dest('./src/css'))
})
//端口
gulp.task('server',function(){
    return gulp.src('src')
    .pipe(server({
        port:9090,
        livereload:true,
		middleware:function(req,res,next){
			var pathname=url.parse(req.url).pathname;
			if(pathname==='/favicon.ico'){
				 res.end('')
			}
			if(pathname=='/list'){
				res.end(JSON.stringify({code:0,msg:list}))
			}else{
				pathname=pathname==='/'?'index.html':pathname,
				res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
			}
		}
    }))
})
gulp.task('watch',function(){
    return gulp.watch('./src/scss/*.scss',gulp.series('devSass'))
})
gulp.task('default',gulp.series('devSass','server','watch'))