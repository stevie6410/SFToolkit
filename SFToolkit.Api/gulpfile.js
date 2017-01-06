var gulp = require("gulp");
var gutil = require("gulp-util");
var rename = require('gulp-rename');
var webpack = require("webpack");
var nodemon = require('nodemon');
var typescript = require('gulp-typescript');

// These tasks setup nodemon.
gulp.task("start", function(cb) {
  var options = {
    watch: ["build/"],
    script: "build/index.js",
    ignore: ["build/public/**/*", "build/client.js"]
  }
  nodemon(options);
  nodemon.on("start", cb);
});

// main task for development. Depending on what has changed,
// it does the appropriate tasks.
gulp.task("watch", ["start"], function() {
  var backendFolders = [
    "./src/**/*",
    ]
  gulp.watch(backendFolders, ["build:backend"]);
});

// build the whole server
gulp.task("build", ["build:backend"]);

var tsProject = typescript.createProject("tsconfig.json", { typescript: require('typescript') });
gulp.task("build:backend", function() {
  var tsResult = tsProject.src().pipe(typescript(tsProject));
  return tsResult.js
    .pipe(rename(function (path) { path.dirname = path.dirname.replace("src", ""); }))
    .pipe(gulp.dest("build/"));
});

gulp.task("build:frontend", function(cb) {
  webpackConfig = {
    // Source maps support (or 'inline-source-map' also works)
    devtool: 'source-map',
    context: __dirname + "/src",
    entry: "./client.tsx",
    output: {
      filename: "app.js",
      path: __dirname + "/build/public/javascripts"
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
      loaders: [
        { test: /\.ts(x?)$/, loader: 'ts-loader'}
      ]
    }
  };

	webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		cb();
	});
});