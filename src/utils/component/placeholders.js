const _ = require('lodash');

module.exports = {
  generatePlaceholders(componentName) {
    return {
      name: componentName,
      rootClass: _.kebabCase(componentName)
    };
  }
};