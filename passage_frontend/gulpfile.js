var gulp = require('gulp')
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var watch = require('gulp-watch')
var browserSync = require('browser-sync').create()

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    files: {
      baseDir: './dist/**/*'
    }
  })
})
const babelPath = 'es6/**/*.js'

const runBabelAndReload = function () {
  const compile = gulp.src(babelPath)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('index.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
  browserSync.reload()
  return compile
}

gulp.task('babel', runBabelAndReload)

// gulp.task('babel-and-reload', ['babel'], cb => {
//   browserSync.reload()
//   cb()
// })

// the watch task
gulp.task('watch', cb => {
  // their could be more watchers here ofc
  watch(babelPath, () => {
    runBabelAndReload()
      .pipe(watch(babelPath))
      .on('end', function (stuff) {
        console.log('yolo')
        return cb(stuff)
      })
  })
})

gulp.task('default', ['browser-sync', 'watch'])
