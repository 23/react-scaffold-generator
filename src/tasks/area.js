const _ = require('lodash');
const path = require('path');
const directories = require('../utils/directories.js');
const files = require('../utils/files.js');
const { generatePlaceholders } = require('../utils/area/placeholders.js');

module.exports = (areaURL, mainComponentType, root) => {
  directories.createDirectories(areaURL, root).then(({ segments, areaPath }) => {
    directories.copyDirectory(path.resolve('scaffold/area'), areaPath).then(() => {
      const placeholders = generatePlaceholders(segments, mainComponentType);
      const promises = [];

      directories.getFilesFromDirectory(areaPath, (filePath, fileName) => {
        promises.push(
          files.replacePlaceholders(areaPath, filePath, placeholders)
        );
      });
    });
  });
};