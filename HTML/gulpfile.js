var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var styleLint = require('gulp-stylelint');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var styleLintFixer = require('gulp-stylefmt');


gulp.task('css-lint-fixer', function() {
  return gulp.src('scss/*.scss')
    .pipe(styleLintFixer({config :{
      "extends": "stylelint-config-sass-guidelines",
      "rules": {
        "indentation": false,
        "number-leading-zero": null
      }
    }}))
    .pipe(gulp.dest('css'));
});


gulp.task('css-lint', ['css-lint-fixer'], function() {
  return gulp.src('css/*.css')
    .pipe(styleLint({
        reporters: [
          {formatter: 'string', console: true}
        ],
        config :{
          "extends": "stylelint-config-sass-guidelines",
          "rules": {
            "indentation": false,
            "number-leading-zero": null
          }
        }
      }));
});

// Compiles SCSS files from /scss into /css
gulp.task('css', function() {
  return gulp.src('css/*.css')
    .pipe(gulp.dest('css'))
});


// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'))

  gulp.src(['node_modules/popper.js/dist/umd/popper.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('vendor/popper'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'))
})

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync'], function() {
  gulp.watch('css/*.css', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});
