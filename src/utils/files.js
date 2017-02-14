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

  forEachPlaceholder(placeholders, callback) {
    _.each(placeholders, (placeholderValue, placeholderName) => {
      placeholderName = `__${_.snakeCase(placeholderName).toUpperCase()}__`;
      callback(placeholderName, placeholderValue);
    });
  },

  replacePlaceholdersInString(string, placeholders) {
    this.forEachPlaceholder(placeholders, (placeholderName, placeholderValue) => {
      string = string.replace(new RegExp(placeholderName, 'gi'), placeholderValue);
    });

    return string;
  },

  replacePlaceholdersInFilename(filePath, fileName, placeholders) {
    const oldPath = path.resolve(filePath, fileName);
    const oldFileName = fileName;

    this.forEachPlaceholder(placeholders, (placeholderName, placeholderValue) => {
      const fileNameRegex = new RegExp(placeholderName);

      if (fileNameRegex.test(fileName)) {
        fileName = fileName.replace(fileNameRegex, placeholderValue);
      }
    });

    if (oldFileName !== fileName) {
      const newPath = path.resolve(filePath, fileName);
      return this.renameFile(oldPath, newPath).then(() => newPath);
    } else {
      return Promise.resolve(fileName);
    }
  },

  replacePlaceholders(areaPath, fileName, placeholders) {
    return this.replacePlaceholdersInFilename(areaPath, fileName, placeholders).then(newPath => {
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