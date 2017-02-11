const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { ncp } = require('ncp');

const createDirectory = (currentPath, segments) => {
  if (segments.length === 0) {
      return;
  }

  const segment = _.upperFirst(segments.pop());
  const newDir = path.resolve(currentPath, segment);

  if (!fs.existsSync(newDir)) {
    fs.mkdir(newDir, () =>
      createDirectory(newDir, segments)
    );
  } else {
    createDirectory(newDir, segments);
  }
};

const createDirectories = (url, root) => {
  const segments = url.split('/').reverse();
  const absoluteRoot = path.resolve(root);

  createDirectory(absoluteRoot, segments);
};

const copyDirectory = (src, dest) => {
  return new Promise((resolve, reject) => {
    ncp(src, dest, err => {
      if (err) {
          return reject(err);
      }

      resolve();
    });
  });
};

module.exports = {
  createDirectories,
  copyDirectory
};