const {src, dest, series, watch} = require('gulp');

//styles
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const  cssMinify = require('gulp-clean-css');


function styles(){
    return src('./frontend/src/styles/**/*.scss')
    .pipe( scss() )
    .pipe( autoprefixer('last 2 versions') )
    .pipe( cssMinify() )
    .pipe( dest('./frontend/dist/styles'))
}

//scripts

const jsMinify = require('gulp-terser');

function scripts(){
    return src('./frontend/src/scripts/**/*.js')
        .pipe( jsMinify() )
        .pipe( dest('./frontend/dist/scripts') )
}

//images

const imagemin = require('gulp-imagemin');

function minifyImages(){
    return src('./frontend/src/images/**/*.jpg')
        .pipe( imagemin() )
        .pipe( dest('./frontend/dist/images'))
}

//watch
function watchTask() {
    watch(
        ['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js', './frontend/src/images/**/*.jpg'], 
        series(styles, scripts, minifyImages)
    )
}

exports.default = series(styles, scripts, minifyImages, watchTask);

