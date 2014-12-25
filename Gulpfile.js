'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jsdoc = require("gulp-jsdoc");
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var sync = require('gulp-config-sync');

function makeBundle(watch, minify) {
  var b = browserify({
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  
  var bundle = function(file) {
    if(file) {
      file.map(function (fileName) {
        gutil.log('File updated', gutil.colors.yellow(fileName));
      });
    }
    
    var ret = b
      .bundle()
      .on('error', function(err) {
        gutil.log("Browserify error:", err.message);
      });
    
    ret = ret
      .pipe(source(minify ? 'ofx4js.min.js' : 'ofx4js.js'));
    
    ret = ret
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}));
    
    if(minify) {
      ret = ret
        // Add transformation tasks to the pipeline here.
        .pipe(uglify());
    }
    
    ret = ret
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  if(watch) {
    b = watchify(b);
    b.on('update', bundle);
  }
  
  b.add('./src/domain/data/index.js');
  return bundle();
}

gulp.task('bundle', function() {
  makeBundle(false, false);
  makeBundle(false, true);
});

gulp.task('watch', function() {
  makeBundle(true);
});

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jsdoc', function() {
  var infos = null;
  var template = {
    path            : 'ink-docstrap',
    systemName      : 'Ofx4js',
    //footer          : "Updraft",
    //copyright       : "Something",
    navType         : "vertical",
    theme           : "journal",
    linenums        : false,
    collapseSymbols : false,
    inverseNav      : false
  };
  var options = {
    'private': true,
    'outputSourceFiles': false,
    debug: true,
    verbose: true
  };
  return gulp.src(['./src/*.js', 'README.md'])
    .pipe(jsdoc('./docs', template, infos, options));
});

gulp.task('test', ['bundle'], function() {
     return gulp.src('./test/test.html')
        .pipe(mochaPhantomJS({ 'webSecurityEnabled': false, "outputEncoding": "utf8", "localToRemoteUrlAccessEnabled": true }));
});

gulp.task('sync', function() {
  return gulp.src(['bower.json', 'component.json'])
    .pipe(sync())
    .pipe(gulp.dest('.')); // write it to the same dir
});

gulp.task('default', ['bundle', 'lint', 'test', 'jsdoc', 'sync']);
