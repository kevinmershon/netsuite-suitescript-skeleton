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





// NetSuite build tasks
const uploadToNetsuite = require('netsuite-deploy/lib/index.js');
const netsuiteSettings = require('./package.json').netsuite;
const credentials      = require('./credentials');

const keepass          = require('keepass-http-client');
const merge            = require('merge-stream');
const gulpUtil         = require('gulp-util');
const changed          = require('gulp-changed');
const filenames        = require('gulp-filenames');
const del              = require('del');

gulp.task('clean', () => {
  return del('dist/');
});
gulp.task('build', () => {
  const scriptDest = `dist/FileCabinet/${netsuiteSettings.folder}/`;
  filenames.forget('all');
  return merge(
    gulp
    .src('src/js/**/*.js')
    .pipe(changed(scriptDest))
    .pipe(gulp.dest(scriptDest))
    .pipe(filenames('files'))
  );
});

function deploy(environment) {
  // Even if there are no results, will still be an empty 'all'
  if (Object.keys(filenames.get('all')).length === 0) {
    gulpUtil.log(gulpUtil.colors.red('No files to deploy!'));
    return;
  }

  let config = filenames.get('objects').length
    ? Object.assign(credentials, { environment, method: 'sdf', file: 'dist\\' })
    : Object.assign(credentials, {
        environment,
        method: 'suitetalk',
        file: filenames.get('files', 'full'),
        path: netsuiteSettings.folder,
        base: `${__dirname}/dist/FileCabinet/${netsuiteSettings.folder}/`,
      });

  return uploadToNetsuite(config);
}

gulp.task('deploy-sandbox',
  gulp.series(
    ['build'],
    () => {
      return deploy('sandbox');
    }
  )
);
