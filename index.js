const inquirer = require('inquirer');
const _ = require('lodash');
const path = require('path');
const directories = require('./src/utils/directories.js');
const { urlQuestion } = require('./src/questions.js');

const root = process.env.root || 'app';

inquirer.prompt([urlQuestion]).then(answers => {
  const { areaURL } = answers;

  directories.createDirectories(areaURL, root).then(({ segments, areaPath }) => {
    directories.copyDirectory(path.resolve('scaffold/area'), areaPath);
  });
});