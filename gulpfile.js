var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

gulp.task('build-css', function() {
  return gulp.src('./src/*.scss')
  .pipe(sass({ includePaths: ['./node_modules'] }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch-css', function() {
  gulp.watch('./src/*.scss', ['build-css']);
});