// Testing
const gulp  = require('gulp');
const mocha = require('gulp-mocha');
const log   = require('gulplog');

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
gulp.task('test', gulp.series('mocha'));





// NetSuite build tasks
const credentials      = require('./credentials');

const merge            = require('merge-stream');
const gulpUtil         = require('gulp-util');
const changed          = require('gulp-changed');
const filenames        = require('gulp-filenames');
const del              = require('del');

gulp.task('clean', () => {
  del(".deploycache"); // wipe the Netsuite deploy cache
  return del('dist/');
});
gulp.task('build', () => {
  const scriptDest = `dist/FileCabinet/${credentials.folder}/`;
  filenames.forget('all');
  return merge(
    gulp
    .src('src/js/**/*.js')
    .pipe(changed(scriptDest))
    .pipe(gulp.dest(scriptDest))
    .pipe(filenames('files'))
  );
});

function deploy(environment, done) {
  // Even if there are no results, will still be an empty 'all'
  if (Object.keys(filenames.get('all')).length === 1) {
    gulpUtil.log(gulpUtil.colors.red('No files to deploy!'));
    return done();
  }

  var envCred = credentials[environment];
  let config = filenames.get('objects').length
    ? Object.assign(envCred, { environment, method: 'sdf', file: 'dist\\' })
    : Object.assign(envCred, {
        environment,
        method: 'suitetalk',
        file: filenames.get('files', 'full'),
        path: credentials.folder,
        base: `${__dirname}/dist/FileCabinet/${credentials.folder}/`,
      });

  const uploadToNetsuite = require('netsuite-deploy/lib/index.js');
  return uploadToNetsuite(config).then(() => {
    done();
    process.exit(0);
  });
}

gulp.task('deploy-sandbox',    gulp.series(['build'], (done) => { return deploy('sandbox',    done); }));
gulp.task('deploy-production', gulp.series(['build'], (done) => { return deploy('production', done); }));
