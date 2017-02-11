const inquirer = require('inquirer');
const { createDirectories } = require('./src/utils/directories.js');
const { urlQuestion } = require('./src/questions.js');

const root = process.env.root || 'app';

inquirer.prompt([urlQuestion]).then(answers => {
  createDirectories(answers.areaURL, root);
});