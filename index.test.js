const fs = require('fs');
const isWindowsBash = require('./index');

// Would love to figure out a better way to do this
const PROC_VERSION_STUBS = {
  WINDOWS: "Linux version 3.4.0-Microsoft (Microsoft@Microsoft.com) (gcc version 4.7 (GCC) ) #1 SMP PREEMPT Wed Dec 31 14:42:53 PST 2014",
  DEBIAN: "Linux version 3.16.0-4-amd64 (debian-kernel@lists.debian.org) (gcc version 4.8.4 (Debian 4.8.4-1) ) #1 SMP Debian 3.16.36-1+deb8u2 (2016-10-19)",
};

function setProcessVars(platform = 'Linux', shell = '/bin/bash') {
  process.platform = platform;
  process.env.SHELL = shell;
}

describe('Handles operating systems correctly', () => {
  test('Should only trigger on Linux', () => {
    setProcessVars('darwin');
    expect(isWindowsBash()).toBe(false);
  });

  test('Should only trigger on Bash', () => {
    setProcessVars('Linux', '/bin/zsh');
    expect(isWindowsBash()).toBe(false);
  });

  test('Should return true on WSL', () => {
    setProcessVars();
    fs.readFileSync = jest.fn().mockReturnValue(PROC_VERSION_STUBS.WINDOWS);

    expect(isWindowsBash()).toBe(true);
  });

  test('Should return false on non-WSL result', () => {
    setProcessVars();
    fs.readFileSync = jest.fn().mockReturnValue(PROC_VERSION_STUBS.DEBIAN);
    
    expect(isWindowsBash()).toBe(false);
  });

  test("Should return false if file doesn't exist", () => {
    setProcessVars();
    fs.readFileSync = jest.fn().mockImplementation(() => {
      throw new Error("ENOENT: no such file or directory, open '/proc/version'");
    });
    
    expect(isWindowsBash()).toBe(false);
  });
});