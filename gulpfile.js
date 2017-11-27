// LINKED NODES 
  var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync').create(),
  eslint = require("gulp-eslint"),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  prettyError = require('gulp-prettyerror'),
  babel = require('gulp-babel');

  const input = "./js/*.js";
  const output = "./js/transpiled"

  gulp.task('babel', function() {
    return gulp.src(input)
        .pipe(babel())
        .pipe(gulp.dest(output));
});


  gulp.task('sass', function() {
  gulp.src('sass/styles.scss')
    .pipe(prettyError())
    .pipe(sass())
    .pipe(autoprefixer({
       browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(cssnano())
    .pipe(rename('styles1.min.css'))
    .pipe(gulp.dest('build/css'));
});
  // var CleanCSS = require('clean-css');




// LINT NODE
  gulp.task('eslint', function() { 
    return gulp.src(['js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
  });


//  JS / CSS MINIFY / MOVE 
  gulp.task('scripts', ["babel", "eslint"], function(){
  gulp.src(output + "*.js")
  .pipe(babel())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./build/js/'))
  
  });

  gulp.task('styles', function(){
  gulp.src('./*.css')
  .pipe(rename({ extname: '.min.css' }))
  .pipe(gulp.dest('./build/css/'))
  });

// THE WATCHER
  gulp.task("watch", function (){
    gulp.watch("js/*.js", ["scripts"]),
    gulp.watch("./*.css", ["styles"]),
    gulp.watch("./sass/*.scss", ["sass"]);
  });

// SYNC WITH WATCH
  gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(["index.html", "build/css/*.css", "build/js/*.js", "sass/*.scss"]).on("change", browserSync.reload);
  });

// COMMAND LINE 
  gulp.task('default', ['watch', "browser-sync"]);