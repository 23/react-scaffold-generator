import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

import './__NAME__.scss';

class __NAME__ extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="__ROOT_CLASS__">

      </div>
    );
  }
}

__NAME__.propTypes = {
  fetchData: PropTypes.func
};

__NAME__.defaultProps = {

};

const mapStateProps = state => ({
  prop: state.prop
});

export default connect(
  mapStateProps,
  { fetchData }
)(__NAME__);