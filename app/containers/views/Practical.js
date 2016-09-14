/**
 * Practical
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Load Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

import View from '../../ui/views/Practical';

class Practical extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Practical');
  }

  render() {
    return (
      <div>
        <Helmet title="Practical" />
        <View />
      </div>
    );
  }
}

Practical.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Practical);
