const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { ncp } = require('ncp');
const walk = require('walk');

module.exports = {
  createDirectory(currentPath, segments, callback) {
    if (segments.length === 0) {
      callback(currentPath);
      return;
    }

    const segment = _.upperFirst(segments.pop());
    const newDir = path.resolve(currentPath, segment);

    if (!fs.existsSync(newDir)) {
      fs.mkdir(newDir, () =>
        this.createDirectory(newDir, segments, callback)
      );
    } else {
      this.createDirectory(newDir, segments, callback);
    }
  },

  createDirectories(url, root) {
    const segments = url.split('/');
    const absoluteRoot = path.resolve(root);

    return new Promise(resolve => {
      this.createDirectory(absoluteRoot, [].concat(segments).reverse(), areaPath => {
        resolve({ segments, areaPath });
      });
    });
  },

  copyDirectory(src, dest) {
    return new Promise((resolve, reject) => {
      ncp(src, dest, err => {
        if (err) {
          return reject(err);
        }

        resolve();
      });
    });
  },

  getFilesFromDirectory(directoryPath, fileCallback, finishCallback) {
    const walker = walk.walk(directoryPath, { followLinks: false });

    walker.on('file', (root, stat, next) => {
      fileCallback(path.resolve(root, stat.name), stat.name);
      next();
    });

    walker.on('end', () => {
      if (finishCallback) {
        finishCallback();
      }
    });
  }
};
