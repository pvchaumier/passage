var gulp = require('gulp')
var browserify = require('browserify')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
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

const runBabelBundleAndReload = function () {
  const compile = browserify({entries: 'es6/index.js', debug: true})
    .transform('babelify', { presets: ['env'] })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('dist/js'))
  browserSync.reload()
  return compile
}

gulp.task('babel', runBabelBundleAndReload)

// the watch task
gulp.task('watch', cb => {
  // their could be more watchers here ofc
  watch(babelPath, () => {
    runBabelBundleAndReload()
      .pipe(watch(babelPath))
      .on('end', cb)
  })
})

gulp.task('default', ['browser-sync', 'watch'])
