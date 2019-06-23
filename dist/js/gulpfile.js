const gulp = require('gulp');
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");               //ES6  ת  ES5

gulp.task('hello',function(){                       //�����ļ�
    gulp.src('*.html').pipe(gulp.dest('dist')).pipe(connect.reload());
})
gulp.task('hello_js',function(){                       //�����ļ�
    gulp.src('*.js').pipe(gulp.dest('dist/js'))
})
gulp.task('img',function(){                       //�����ļ�
    gulp.src('img/**').pipe(gulp.dest('dist/img'));
})
gulp.task('watch',function(){                       //����ļ�״̬
    gulp.watch('*.html',['hello']);
    gulp.watch('*.scss',['copyCss'])
    gulp.watch('*.css',['zipCss'])
    gulp.watch("img/**",['img'])
    gulp.watch("*.js",['hello_js'])
})

gulp.task('copyCss',function(){                    //ת��scss�ļ�
    gulp.src('*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"))
})

gulp.task('zipCss',function(){                    //ѹ��CSS����
    gulp.src('dist/css/*.css').pipe(cleanCss())
    .pipe(rename({suffix:'-min'}))
    .pipe(gulp.dest('dist/css'))
})
gulp.task('Hejs',function(){                          //�ϲ�js  ѹ��js����
    gulp.src(["a.js",'b.js'])
    .pipe(concat('mian.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix:'-min'}))
    .pipe(gulp.dest('dest/js'))
})

gulp.task('server',function(){            //����������
     connect.server({
         root:'dist',
         livereload:true                   //ʵʱˢ��
     })
})

gulp.task("default",["server","watch"]);           //����Ĭ���¼�  ֱ����gulp ��
gulp.task('bulid',['hello','copyCss','zipCss',"img"]);    //����