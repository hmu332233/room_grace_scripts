const exec = require('child_process').exec;

class JnuPoster {
  post() {
    exec('node_modules/phantomjs/bin/phantomjs modules/jnuPoster/jnuPoster.js', (error, stdout, stderr) => {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
}

module.exports = JnuPoster