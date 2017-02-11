const inquirer = require('inquirer');
const path = require('path');
const { createDirectories, copyDirectory } = require('./src/utils/directories.js');
const { urlQuestion } = require('./src/questions.js');

const root = process.env.root || 'app';

inquirer.prompt([urlQuestion]).then(answers => {
  const { areaURL } = answers;
  const areaPath = path.resolve(root, areaURL);

  createDirectories(areaURL, root);
  copyDirectory(path.resolve('scaffold/area'), areaPath);
});