const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { ncp } = require('ncp');

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
  }
};
