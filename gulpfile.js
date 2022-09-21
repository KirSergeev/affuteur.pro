/**
 * To start using gulp, just run
 * npm update
 * npm run gulp.watch
 */
// Require all dependencies
const { src, dest, watch, parallel, series, task } = require("gulp"),
      sass = require('gulp-sass')(require('sass')),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      rigger = require('gulp-rigger'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify-es').default,
      rename = require('gulp-rename'),
      htmlmin = require('gulp-htmlmin');


// html-min
let minifyHtml =()=> {
    return src('./src/*.html')
        .pipe(rigger()) //Прогоним через rigger
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./public')); //Выплюнем их в папку build
}
exports.minifyHtml = minifyHtml;

// Build MIN CSS
let stylesMin =()=> {
    return src(['./src/scss/style.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        // .on('error', console.log)
        .pipe(dest('./src/css'))
}
exports.stylesMin = stylesMin;

let scripts =()=> {
    return src(['./node_modules/jquery/dist/jquery.min.js','./src/js/**/*.js'])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .on('error', console.log)
        .pipe(dest('./src/js/'));
}
exports.scripts = scripts;


// Watchers
let Wch =(done)=> {
    watch('./src/scss/**/*.scss', series(stylesMin));
    watch('./src/js/**/*.js', series(scripts));
    watch('./src/*.html', series(minifyHtml));
}
exports.Wch = Wch;

// Build
let build = series(parallel(stylesMin,scripts),minifyHtml);
exports.build = build;

// Default
let def = series(stylesMin,scripts,minifyHtml,Wch);
exports.default = def;