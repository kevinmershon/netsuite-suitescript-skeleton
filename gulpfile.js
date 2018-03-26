var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var log   = require('gulplog');

gulp.task('mocha', function() {
  return gulp.src(['test/**/*.js'], { read: false })
             .pipe(mocha({ reporter: 'list' }))
             .on('error', function (err) {
               //log.error(err.stack); // not super helpful
             });
});

const watchMocha = function() {
  gulp.watch(['lib/**', 'src/**', 'test/**'], gulp.series('mocha'));
}
gulp.task('watch-tests', watchMocha);
