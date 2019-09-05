// Simple Wrapper to add promises to the core fs module
const ogfs = require('fs');


class fs {
  async readFile(filename) {
    return new Promise( (res, rej) => {
      ogfs.readFile(filename, (err, fd) => {
        if (err) {
          rej(err);
        } else {
          res(fd);
        }
      })
    });
  }

  async writeFile(filename, data) {
    return new Promise( (res, rej) => {
      ogfs.writeFile(filename, data, (err, fd) => {
        if (err) {
          rej(err);
        } else {
          res(fd);
        }
      })
    });
  }
}

module.exports = new fs();