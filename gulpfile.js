// Testing
const gulp   = require('gulp');
const eslint = require('gulp-eslint');
const mocha  = require('gulp-mocha');
const log    = require('gulplog');
const spawn  = require('child_process').spawn;
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)

gulp.task('lint', function() {
    return gulp.src('src/js/**/*.js')
               .pipe(eslint())
               .pipe(eslint.format())
               .pipe(eslint.failAfterError());
});
const watchLint = function() {
  gulp.watch(['lib/**', 'src/**'], gulp.series('lint'));
}
gulp.task('watch-lint', watchLint);

gulp.task('mocha', function() {
  return gulp.src(['test/**/*.js'], { read: false })
             .pipe(mocha({ reporter: 'list' }))
             .on('error', function (err) {
               //log.error(err.stack); // not super helpful
             });
});

const watchMocha = function() {
  gulp.watch(['lib/**', 'src/**', 'test/**'], gulp.series('lint', 'mocha'));
}
gulp.task('watch-tests', watchMocha);
gulp.task('test', gulp.series('lint', 'mocha'));

function createScript(done) {
  var fs = require('fs');
  var scriptHeader;
  fs.readFile("templates/_script_header.js", function(err, data) {
    scriptHeader = data;
  });


  var name, email;
  exec('git config user.name',  function(error,stdout,stderr){ name  = stdout.trim(); });
  exec('git config user.email', function(error,stdout,stderr){ email = stdout.trim(); });

  var schema = {
    properties: {
      Type: { required: true,
        message: 'client | mapreduce | restlet | scheduled | suitelet | userevent | workflow',
        pattern: /client|mapreduce|restlet|scheduled|suitelet|userevent|workflow/
      },
      Company: { required: true },
      ScriptTitle: {
        required: true,
        message:   'Script Title (spaces allowed, max 40 chars)',
        maxLength: 40
      },
      ScriptFileName: {
        required: true,
        message: 'Script filename: (ends in .js)',
        pattern: /^.+\.js$/
      },
      ScriptID: {
        required:  true,
        message:   'Script ID (starts with customscript_, no dashes or spaces, max 40 chars)',
        pattern:   /^customscript\_[0-9a-zA-Z\_]+$/,
        maxLength: 40
      }
    }
  };
  prompter.start();
  prompter.get(schema, function (err, result) {
    if (err) { return onErr(err); }

    var replace = require('gulp-batch-replace');
    var rename  = require("gulp-rename");
    var replaceThis = [
        [ '{{ScriptHeader}}',   scriptHeader ],
        [ '{{Company}}',        result.Company ],
        [ '{{Name}}',           name],
        [ '{{Email}}',          email],
        [ '{{ScriptFileName}}', result.ScriptFileName ],
        [ '{{ScriptTitle}}',    result.ScriptTitle ],
        [ '{{ScriptID}}',       result.ScriptID ]
    ];
    gulp.src('templates/'+result.Type+'_template.js')
        .pipe(replace(replaceThis))
        .pipe(rename(result.ScriptFileName))
        .pipe(gulp.dest('src/js/'+result.Type+'/'));

    done();
  });
}
gulp.task('create-script', gulp.series([], (done) => { return createScript(done); }));




// NetSuite build tasks
const credentials      = require('./credentials');

const merge            = require('merge-stream');
const gulpUtil         = require('gulp-util');
const changed          = require('gulp-changed');
const filenames        = require('gulp-filenames');
const del              = require('del');
const prompter         = require('prompt');

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

gulp.task('list-files', () => {
  filenames.forget('all');
  return merge(
    gulp
    .src('src/js/**/*.js')
    .pipe(filenames('files'))
  );
});

function prepareSDFCredentials(envCred) {
  // Prepare SDF credentials
  require('fs').writeFileSync('.sdf', `account=${envCred.account}\nemail=${envCred.email}\nrole=${envCred.role}\nurl=system.netsuite.com`);
}

function runSDFCommand(envCred, typeFlag, scriptId) {
  var path = __dirname;

  switch (typeFlag.toLowerCase()) {
    case '--preview':
    case '--deploy':
      path = `/tmp/netsuite-${envCred.account}.zip`;
      var doZip = spawn('zip', [
        '-r', path,
        '.',
        '--exclude=*.git*',
        '--exclude=*node_modules*'
      ]);
      break;
    default:
      // no-op
  }

  var type;
  const destFolder = '/Objects';
  var args;
  switch (typeFlag.toLowerCase()) {
    case '--listobjects':
      args = ['listobjects',
              '-account', envCred.account,
              '-email',   envCred.email,
              '-role',    envCred.role,
              '-url',     'system.netsuite.com'];
      break;
    case '--preview':
      args = ['preview',
              '-account', envCred.account,
              '-email',   envCred.email,
              '-role',    envCred.role,
              '-p',       path,
              '-url',     'system.netsuite.com'];
      break;
    case '--workflow':
      type = 'workflow'; destFolder = '/Objects';
      args = ['importobjects',
              '-scriptid',          scriptId,
              '-type',              type,
              '-p',                 path,
              '-destinationfolder', destFolder];
      break;
    case '--savedsearch':
      type = 'savedsearch'; destFolder = '/Objects';
      args = ['importobjects',
              '-scriptid',          scriptId,
              '-type',              type,
              '-p',                 path,
              '-destinationfolder', destFolder];
      break;
    case '--deploy':
      args = ['deploy',
              '-account', envCred.account,
              '-email',   envCred.email,
              '-role',    envCred.role,
              '-p',       path,
              '-url',     'system.netsuite.com'];
      break;
    default:
      // workflow, savedsearch, script types, etc.
      type = typeFlag.toLowerCase().substring(2);
      args = ['importobjects',
              '-scriptid',          scriptId,
              '-type',              type,
              '-p',                 path,
              '-destinationfolder', destFolder];
  }


  var sdfcli = spawn('sdfcli', args);

  var showAfter = false;
  sdfcli.stderr.on('data', function(data) {
    var inString = (''+data);
    var lines = inString.split('\n');
    for (var i in lines) {
      gulpUtil.log(gulpUtil.colors.red(lines[i]));
    }
  });
  sdfcli.stdout.on('data', function (data) {
    var inString = (''+data);
    if (inString.indexOf('Enter password:') >= 0) {
      sdfcli.stdin.write(`${envCred.password}\r`);
    } else if (inString.indexOf('YES to') >= 0) {
      sdfcli.stdin.write('YES\r');
    } else if (inString.indexOf('Using user credentials') >= 0) {
      showAfter = true;
    } else if (inString.indexOf('[INFO]') >= 0) {
      // hide output after the list of files
      showAfter = false;
    }// else if (showAfter) {
      var lines = inString.split('\n');
      for (var i in lines) {
        gulpUtil.log(lines[i]);
      }
    //}
  });

  sdfcli.on('exit', function (code) {
    sdfcli.stdin.end();
  });
}

function sdfcli(sdfArgs, done) {
  // shortcut for environment-agnostic commands
  runSDFCommand(null, sdfArgs[0], sdfArgs[1]);
  done();
}

function deploy(environment, sdfArgs, done) {
  var envCred = credentials[environment];
  prepareSDFCredentials(envCred);

  if (sdfArgs && sdfArgs.length > 0 && sdfArgs[0] === '--sdf') {
    runSDFCommand(envCred, '--deploy');
    done();
  } else {
    // Even if there are no results, will still be an empty 'all'
    if (Object.keys(filenames.get('all')).length === 1) {
      gulpUtil.log(gulpUtil.colors.red('No files to deploy!'));
      return done();
    }

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
}

function fetch(environment, sdfArgs, done) {
  var envCred = credentials[environment];
  prepareSDFCredentials(envCred);

  if (sdfArgs && sdfArgs.length > 0) {
    runSDFCommand(envCred, sdfArgs[0], sdfArgs[1]);
    done();
  } else {
    // Even if there are no results, will still be an empty 'all'
    if (Object.keys(filenames.get('all')).length === 1) {
      gulpUtil.log(gulpUtil.colors.red('No files to fetch!'));
      return done();
    }

    let config = filenames.get('objects').length
      ? Object.assign(envCred, { environment, method: 'sdf', file: 'dist\\' })
      : Object.assign(envCred, {
          environment,
          method: 'suitetalk',
          file: filenames.get('files', 'full'),
          path: credentials.folder,
          base: `${__dirname}/dist/FileCabinet/${credentials.folder}/`,
        });

    const downloadFromNetsuite = require('netsuite-deploy/lib/download.js');
    return downloadFromNetsuite(config).then(() => {
      done();
      process.exit(0);
    });
  }
}

// SDF args
var sdfArgs = process.argv.slice(3);

gulp.task('deploy-sandbox',    gulp.series(['lint', 'build'], (done) => { return deploy('sandbox', sdfArgs, done); }));
gulp.task('pull-sandbox', gulp.series(['list-files'], (done) => { return fetch('sandbox', sdfArgs, done); }));
gulp.task('deploy-production', gulp.series(['lint', 'build'], (done) => { return deploy('production', sdfArgs, done); }));
gulp.task('pull-production', gulp.series(['list-files'], (done) => { return fetch('production', sdfArgs, done); }));
gulp.task('sdf', gulp.series([], (done) => { return sdfcli(sdfArgs, done); }));
