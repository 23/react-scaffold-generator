const inquirer = require('inquirer');
const areaTask = require('./src/tasks/area.js');
const { urlQuestion, fetchQuestion } = require('./src/utils/area/questions.js');

const root = process.env.root || 'app';

inquirer.prompt([urlQuestion, fetchQuestion]).then(answers => {
  const { areaURL, mainComponentType } = answers;

  areaTask(areaURL, mainComponentType, root);
});