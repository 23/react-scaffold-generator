import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions.js';

import './__NAME__.scss';

class __NAME__ extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="__ROOT_CLASS__">

      </div>
    )
  }
}

const mapStateProps = state => {
  return state;
};

export default connect(
  mapStateProps,
  { fetchData }
)(__NAME__);