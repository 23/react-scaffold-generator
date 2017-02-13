const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = {
  renameFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, err => {
        if (err) {
            return reject(err);
        }

        resolve();
      });
    });
  },

  replacePlaceholdersInString(string, placeholders) {
    _.each(placeholders, (placeholderValue, placeholderName) => {
      placeholderName = `__${_.snakeCase(placeholderName).toUpperCase()}__`;
      string = string.replace(new RegExp(placeholderName, 'gi'), placeholderValue);
    });

    return string;
  },

  replacePlaceholders(areaPath, fileName, placeholders) {
    const areaNameRegex = /__AREA_NAME__/;
    const { areaName } = placeholders;
    const oldPath = path.resolve(areaPath, fileName);
    let renamePromise = Promise.resolve();
    let newPath = oldPath;

    if (areaNameRegex.test(fileName)) {
      const newName = fileName.replace(areaNameRegex, areaName);

      newPath = path.resolve(areaPath, newName);
      renamePromise = this.renameFile(oldPath, newPath);
    }

    return renamePromise.then(() => {
      return new Promise((resolve, reject) => {
        fs.readFile(newPath, 'utf8', (err, data) => {
          if (err) {
            return reject(err);
          }

          data = this.replacePlaceholdersInString(data, placeholders);

          fs.writeFile(newPath, data, 'utf8', err => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      });
    });
  }
};