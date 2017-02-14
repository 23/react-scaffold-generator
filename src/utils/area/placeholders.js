const _ = require('lodash');

const getComponentName = (componentType, areaName) => {
  if (componentType === 'container') {
    return `${areaName}ContainerComponent`;
  } else {
    return `${areaName}Component`;
  }
};

module.exports = {
  generatePlaceholders(segments, mainComponentType) {
    const areaName = _.upperFirst(segments[segments.length-1]);
    return {
      areaName,
      areaNameCapitalized: areaName.toUpperCase(),
      areaSegment: areaName.toLowerCase(),
      mainComponentName: getComponentName(mainComponentType, areaName)
    };
  }
};