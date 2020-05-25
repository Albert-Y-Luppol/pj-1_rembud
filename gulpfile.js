'use strict';

let gulp            = require('gulp'),
    rigger          = require('gulp-rigger'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require("gulp-rename"),
    uglify          = require("gulp-uglify-es").default,
    // pngquant        = require('imagemin-pngquant'),
    // zopfli          = require('imagemin-zopfli'),
    // mozjpeg         = require('imagemin-mozjpeg'),
    // giflossy        = require('imagemin-giflossy'),
    // jpegtran        = require('imagemin-jpegtran'),
    imagemin        = require('gulp-imagemin'),
    clean           = require('gulp-clean');


gulp.task('html', gulp.series(function(){
    return gulp.src(['src/html/views/**/*.html','!src/html/**/_*.html'])
        .pipe(rigger())
        .pipe(gulp.dest('dist/html'))
        .pipe(browserSync.stream());
}));

gulp.task('sass', function() {
    return gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss"'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});


gulp.task('js', function (){
    return gulp.src(['src/js/**/*.js', '!src/js/**/_*.js'])
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});


gulp.task('fonts', function (){
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});


gulp.task('img', gulp.series( function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
}));


gulp.task('clean', function (){
    return gulp.src('dist', {allowEmpty: true}).pipe(clean());
});


// Static Server + watching js/scss/html files
gulp.task('serve', gulp.series('html', 'sass', 'js', 'img', 'fonts', function() {

    browserSync.init({
        server: "./dist",
        startPath: "/html/en/home/hero.html"
    });

    gulp.watch("./src/html/**/*.html",  gulp.parallel('html'));
    gulp.watch("./src/scss/**/*.scss", gulp.parallel('sass'));
    gulp.watch("./src/js/**/*.js", gulp.parallel('js'));
    // gulp.watch("./src/fonts/**/*.*", gulp.parallel('fonts'));
    gulp.watch("./src/img/**/*.*", gulp.parallel('img'));
}));


gulp.task('default', gulp.series('clean', 'serve'));