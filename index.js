fs = require('fs')

function isWindowsBash() {
  if (process.platform.toLowerCase() === 'linux' &&
      process.env.SHELL.toLowerCase() === '/bin/bash') {
    try {
      var data = fs.readFileSync('/proc/version', 'utf-8');
      return data.toLowerCase().indexOf('microsoft') > -1;
    } catch (err) {
      return false;
    }
  }

  return false;
}

module.exports = isWindowsBash;
