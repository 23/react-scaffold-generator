const fs = require('fs');
const path = require('path');
const _ = require('lodash');

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
  const absoluteRoot = path.resolve(process.env.PWD, root);

  createDirectory(absoluteRoot, segments);
};

module.exports = {
  createDirectories
};