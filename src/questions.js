const urlQuestion = {
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
  }
};

module.exports = {
  urlQuestion
};