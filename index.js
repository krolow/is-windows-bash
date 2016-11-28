fs = require('fs')

module.exports = () => {
  if (process.platform.toLowerCase() === 'linux' && 
      process.env.SHELL.toLowerCase() === '/bin/bash') {
    try {
      const data = fs.readFileSync('/proc/version', 'utf-8');    
      return data.toLowerCase().includes('microsoft');
    } catch (err) {    
      return false;
    }
  }

  return false;
};