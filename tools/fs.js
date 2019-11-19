// Simple Wrapper to add promises to the core fs module
const ogfs = require('fs');
const path = require('path');

class fs {
  async readFile(filename) {
    return new Promise( (res, rej) => {
      ogfs.readFile(path.resolve(__dirname, '../', filename), (err, fd) => {
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
      ogfs.writeFile(path.resolve(__dirname, '../', filename), data, (err, fd) => {
        if (err) {
          rej(err);
        } else {
          res(fd);
        }
      })
    });
  }

  async unlink(filename) {
    return new Promise( (res, rej) => {
      ogfs.unlink(path.resolve(__dirname, '../', filename), ( _ ) => {
        // if this fails we don't care
        res(true);
      })
    })
  }
}

module.exports = new fs();