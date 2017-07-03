const _ = require('lodash');

module.exports = {
  urlQuestion: {
    type: 'input',
    name: 'areaURL',
    message: 'Enter the URL of the area where the component will be placed',
    filter: val => {
      if (val[0] === '/') {
        val = val.substr(1);
      }

      if (val[val.length-1] === '/') {
        val = val.substr(0, val.length-1);
      }

      return val;
    },
    validate: val => {
      if (_.isEmpty(val)) {
        return 'This does not look like a valid URL';
      }

      return true;
    }
  },
  typeQuestion: {
    type: 'list',
    name: 'componentType',
    message: 'Select the purpose of the component',
    choices: [
      {
        name: 'It will fetch its own data',
        value: 'container'
      },
      {
        name: 'It will only render layout',
        value: 'presentational'
      }
    ]
  },
  functionalQuestion: {
    type: 'confirm',
    name: 'isStateful',
    message: 'Will it have its own state?',
    default: false
  },
  nameQuestion: {
    type: 'input',
    name: 'componentName',
    message: 'Enter the name of your component',
    filter: val => {
      if (!/\w+Component/.test(val)) {
        val = `${val}Component`;
      }

      return _.upperFirst(val);
    },
    validate: val => {
      if (_.isEmpty(val)) {
        return 'This does not look like a valid component name';
      }

      return true;
    }
  }
};