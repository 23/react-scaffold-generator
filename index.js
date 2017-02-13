const inquirer = require('inquirer');
const _ = require('lodash');
const path = require('path');
const directories = require('./src/utils/directories.js');
const files = require('./src/utils/files.js');
const { urlQuestion } = require('./src/questions.js');

const root = process.env.root || 'app';

inquirer.prompt([urlQuestion]).then(answers => {
  const { areaURL } = answers;

  directories.createDirectories(areaURL, root).then(({ segments, areaPath }) => {
    const areaName = _.upperFirst(segments[segments.length-1]);

    directories.copyDirectory(path.resolve('scaffold/area'), areaPath).then(() => {
      const placeholders = { areaName, areaSegment: areaName.toLowerCase() };
      const filesToProcess = ['routes.js', 'containers/index.js'];
      const promises = [];

      filesToProcess.forEach(filePath => {
        promises.push(
          files.replacePlaceholders(areaPath, path.resolve(areaPath, filePath), placeholders)
        );
      });
    });
  });
});