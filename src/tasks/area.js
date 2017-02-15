const _ = require('lodash');
const path = require('path');
const directories = require('../utils/directories.js');
const files = require('../utils/files.js');
const { generatePlaceholders } = require('../utils/area/placeholders.js');
const componentTask = require('./component.js');

module.exports = (areaURL, mainComponentType) => {
  return new Promise((resolve, reject) => {
    directories.createDirectories(areaURL, directories.resolveWorkingDir('app')).then(({ segments, areaPath }) => {
      return directories.copyDirectory(path.resolve(__dirname, '../../scaffold/area'), areaPath).then(() => {
        const placeholders = generatePlaceholders(segments, mainComponentType);
        const promises = [];

        directories.getFilesFromDirectory(areaPath, (filePath, fileName) => {
          promises.push(
            files.replacePlaceholders(areaPath, filePath, placeholders)
          );
        }, () => {
          Promise.all(promises).then(() => {
            const componentType = mainComponentType === 'container' ? 'component_container' : 'component';
            const componentsPath = path.resolve(areaPath, 'components');

            return componentTask(componentsPath, placeholders.mainComponentName, componentType).then(
              () => resolve(areaPath)
            );
          }).catch(err => reject(err));
        }, err => {
          reject(err);
        });
      });
    }).catch(err => reject(err));
  });
};