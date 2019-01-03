const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const clean = require('gulp-clean');

const swallowError = (error) => {
    console.log(error.toString());

    this.emit('end');
};

// GERAR SVG
// limpando svg
gulp.task('clean-svg', function () {
  return gulp.src('assets/images/svg/svg.svg', {read: false})
    .pipe(clean());
});

// gerando svg
gulp.task('svg', ['clean-svg'], function () {
    return gulp.src('assets/images/svg/**/*.svg')
    .pipe(svgmin(function (file) {
        const prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest('assets/images/svg'))
});

gulp.task('less', function() {
    gulp.src('assets/less/main.less')
    .pipe(less())
    .on('error', swallowError)
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/css'))
    .pipe(connect.reload());
});

// WATCH LESS, SCRIPTS E LIVERELOAD
gulp.task('watch', function() {
    gulp.watch('assets/less/**/*.less', ['less']);
});

gulp.task('default', ['less', 'watch']);
