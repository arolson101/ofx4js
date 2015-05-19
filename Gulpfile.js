'use strict';

var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var merge = require('merge2');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var sync = require('gulp-config-sync');
var ts = require('gulp-typescript');
var typedoc = require("gulp-typedoc");
var gutil = require("gulp-util");
var fs = require("fs");
var webpack = require("webpack");

gulp.task('compile', function() {
    var tsProject = ts.createProject('tsconfig.json', { sortOutput: true });
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    var dts = tsResult.dts.pipe(gulp.dest('./lib'));
    var js = tsResult.js;

    js = js
        .pipe(sourcemaps.write('./', {sourceRoot: "../src"}))
        .pipe(gulp.dest('./lib'));

    return merge([dts, js]);
});

gulp.task('webpack', ['compile'], function(callback) {
    webpack({
      entry: "./lib/ofx4js.js",
      output: {
          library: "ofx4js",
          libraryTarget: "umd",
          path: __dirname,
          filename: "dist/ofx4js.min.js"
      },
      module: {
          preLoaders: [
            {
              test: /\.js$/,
              loader: "source-map-loader"
            }
          ],
      },
      devtool: "source-map",
      plugins: [
        // minify
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
      ]
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("typedoc", function() {
    return gulp
        .src(["src/*.ts"])
        .pipe(typedoc({
            module: "commonjs",
            out: "./doc",
            theme: "minimal",
            name: "Ofx4js",
            target: "es5",
            mode: "file",
            includeDeclarations: true
        }))
    ;
});

gulp.task('watch', ['compile'], function() {
    gulp.watch('src/*.ts', ['compile']);
});

gulp.task('test', ['webpack'], function() {
     return gulp.src('./test/test.html')
        .pipe(mochaPhantomJS({ 'webSecurityEnabled': false, "outputEncoding": "utf8", "localToRemoteUrlAccessEnabled": true }));
});

gulp.task('sync', function() {
  return gulp.src(['bower.json', 'component.json'])
    .pipe(sync())
    .pipe(gulp.dest('.')); // write it to the same dir
});

gulp.task('default', ['compile', 'webpack', 'test', 'typedoc', 'sync']);
