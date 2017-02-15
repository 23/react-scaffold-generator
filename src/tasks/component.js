const directories = require('../utils/directories.js');
const files = require('../utils/files.js');
const path = require('path');
const { generatePlaceholders } = require('../utils/component/placeholders.js');

module.exports = (componentsPath, componentName, componentType) => {
  return new Promise((resolve, reject) => {
    const sourcePath = path.resolve(__dirname, `../../scaffold/${componentType}`);
    const destPath = directories.resolveWorkingDir(componentsPath, componentName);

    directories.copyDirectory(sourcePath, destPath).then(() => {
      const placeholders = generatePlaceholders(componentName);
      const promises = [];

      directories.getFilesFromDirectory(destPath, filePath => {
        promises.push(
          files.replacePlaceholders(destPath, filePath, placeholders)
        );

        Promise.all(promises).then(() => resolve(componentsPath));
      });
    });
  });
};