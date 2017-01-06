const gulp = require('gulp');
const ts = require('gulp-typescript');
var webpack = require('webpack-stream');
var nodemon = require('nodemon');
var chain = require('gulp-chain');

var myStream = chain(function (stream) {
  return stream
    .pipe(pluginA())
    .pipe(pluginB());
});

gulp.task('mytask', function () {
  gulp
    .src('src/entry.js')
    .pipe()
});

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default', function () {
  return gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js'))
    , null
    , function (err, stats) {
      nodemon({
        script: './dist/bundle.js'
        , ext: 'js'
        , env: { 'NODE_ENV': 'development' }
      })
    })
    .pipe(gulp.dest(''));
});

gulp.task('start', function () {
  nodemon({
    script: './dist/bundle.js'
    , ext: 'js'
    , env: { 'NODE_ENV': 'development' }
  })
})