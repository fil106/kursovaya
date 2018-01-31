var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var BS = require('browser-sync');

var config = {
  app: './app',
  dist: './dist'
};

var mainJsName = 'common.js';

gulp.task('js', function() {
  return gulp.src(config.app + '/js/*.js')
    .pipe(concat(mainJsName))
    .pipe(gulp.dest(config.dist + '/js/'));
});

gulp.task('css', function() {
  return gulp.src(config.app + '/css/*.css')
    .pipe(concatCss("style.css"))
    .pipe(gulp.dest(config.dist + '/css/'));
});

gulp.task('copyJquery', function () {
  gulp.src('./bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(config.dist + '/js/'));
  gulp.src('./bower_components/jquery-ui/jquery-ui.min.js')
    .pipe(gulp.dest(config.dist + '/js/'));
});

gulp.task('copyJson', function () {
  gulp.src(config.app + '/data-json/*.json')
    .pipe(gulp.dest(config.dist + '/data-json/'));
});

gulp.task('copyFonts', function () {
  gulp.src(config.app + '/fonts/**/*')
    .pipe(gulp.dest(config.dist + '/fonts/'));
});

gulp.task('copyHtml', function () {
  gulp.src(config.app + '/html/*')
    .pipe(gulp.dest(config.dist + '/html/'));
});

gulp.task('copyImg', function () {
  gulp.src(config.app + '/img/**/*')
    .pipe(gulp.dest(config.dist + '/img/'));
});

gulp.task('copyVideo', function () {
  gulp.src(config.app + '/video/**/*')
    .pipe(gulp.dest(config.dist + '/video/'));
});

gulp.task('copyIndex', function () {
  gulp.src(config.app + '/index.html')
    .pipe(gulp.dest(config.dist + '/'));
});

/** когда пишем в консоли gulp запускается таск default! **/
gulp.task('default', ['js', 'css', 'copyJquery', 'copyJson', 'copyFonts', 'copyHtml', 'copyImg', 'copyVideo', 'copyIndex', 'watch', 'server'], function() {
  console.log('default task');
});

// Watcher
gulp.task('watch', function() {
  gulp.watch(config.app + '/js/*.js', ['js']);
  gulp.watch(config.app + '/css/*.css', ['css']);
  gulp.watch(config.app + '/data-json/*.json', ['copyJson']);
  gulp.watch(config.app + '/fonts/**/*', ['copyFonts']);
  gulp.watch(config.app + '/html/*', ['copyHtml']);
  gulp.watch(config.app + '/img/**/*', ['copyImg']);
  gulp.watch(config.app + '/video/**/*', ['copyVideo']);
  gulp.watch(config.app + '/index.html', ['copyIndex']);
});

// Server
gulp.task('server', function() {
  BS({
    server: {
      baseDir: config.dist
    }
  });
});