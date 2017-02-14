const _ = require('lodash');

module.exports = {
  urlQuestion: {
    type: 'input',
    name: 'areaURL',
    message: 'Enter the URL for your area',
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
    }
  },
  fetchQuestion: {
    type: 'list',
    name: 'mainComponentType',
    message: 'Select the data fetching behaviour',
    choices: [
      {
        name: 'The main component will fetch data from a single source that the subcomponents will use',
        value: 'container'
      },
      {
        name: 'The children will fetch their own data independently',
        value: 'presentational'
      }
    ]
  }
};