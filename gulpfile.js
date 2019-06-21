const gulp = require('gulp');
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");               //ES6  转  ES5

gulp.task('hello',function(){                       //复制文件
    gulp.src('*.html').pipe(gulp.dest('dist')).pipe(connect.reload());
})
gulp.task('watch',function(){                       //监控文件状态
    gulp.watch('*.html',['hello']);
    gulp.watch('*.scss',['copyCss'])
    gulp.watch('*.css',['zipCss'])
})

gulp.task('copyCss',function(){                    //转换scss文件
    gulp.src('index.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
})

gulp.task('zipCss',function(){                    //压缩CSS代码
    gulp.src('dist/css/index.css').pipe(cleanCss())
    .pipe(rename({suffix:'-min'}))
    .pipe(gulp.dest('dist/css'))
})
gulp.task('Hejs',function(){                          //合并js  压缩js代码
    gulp.src(["index.js",'a.js'])
    .pipe(concat('mian.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix:'-min'}))
    .pipe(gulp.dest('dest/js'))
})

gulp.task('server',function(){            //开启服务器
     connect.server({
         root:'dist',
         livereload:true                   //实时刷新
     })
})

gulp.task("default",["server","watch"]);           //设置默认事件  直接用gulp 打开
gulp.task('bulid',['hello','copyCss','zipCss']);    //开启
