const directories = require('../utils/directories.js');
const files = require('../utils/files.js');
const path = require('path');
const { generatePlaceholders } = require('../utils/component/placeholders.js');

module.exports = (destPath, componentName, componentType) => {
  debugger;
  const sourcePath = path.resolve(`scaffold/${componentType}`);

  destPath = path.resolve(destPath, componentName);

  directories.copyDirectory(sourcePath, destPath).then(() => {
    const placeholders = generatePlaceholders(componentName);

    directories.getFilesFromDirectory(destPath, filePath => {
      files.replacePlaceholders(destPath, filePath, placeholders)
    });
  });
};