module.exports = `var path = require('path')
var gulp = require('gulp')
var cleanCSS = require('gulp-clean-css')
var cssWrap = require('gulp-css-wrap')
gulp.task('theme-red', function () {
    return gulp.src(path.resolve('./src/theme_src/custom-red/index.css'))
        .pipe(cssWrap({
            selector: '.custom-red' /* 添加的命名空间 */
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/theme/custom-red'))
})

gulp.task('theme-blue', function () {
    return gulp.src(path.resolve('./src/theme_src/custom-blue/index.css'))
        .pipe(cssWrap({
            selector: '.custom-blue' /* 添加的命名空间 */
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/theme/custom-blue'))
})

gulp.task('default', ['theme-red', 'theme-blue']);`