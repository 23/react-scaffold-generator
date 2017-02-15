import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

import './__NAME__.scss';

class __NAME__ extends React.Component {
  componentWillMount() {
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
  fetchData: React.PropTypes.func
};

const mapStateProps = state => ({
  prop: state.prop
});

export default connect(
  mapStateProps,
  { fetchData }
)(__NAME__);