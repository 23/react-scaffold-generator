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

    return new Promise((resolve) => {
      this.createDirectory(root, [].concat(segments).reverse(), areaPath => {
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

  getFilesFromDirectory(directoryPath, fileCallback, finishCallback, errorCallback) {
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

    walker.on('errors', (root, nodeStats) => {
      if (errorCallback) {
        errorCallback(_.map(nodeStats, stat => {
          const error = stat.error.message || `${stat.error.code} ${stat.error.path}`;
          return `${stat.name}: ${error}`;
        }).join());
      }
    });
  },

  doesDirectoryExist(dirPath) {
    try {
      fs.statSync(dirPath);
      return true;
    } catch(e) {
      return false;
    }
  },

  convertURLtoPath(url) {
    const segments = url.split('/').map(segment => _.upperFirst(segment)).join('/');

    return this.resolveWorkingDir('app', segments);
  },

  resolveWorkingDir(...args) {
    if (args) {
      return path.resolve(process.cwd(), ...args);
    } else {
      return path.resolve(process.cwd());
    }
  }
};
