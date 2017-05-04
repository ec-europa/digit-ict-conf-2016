/**
 * Practical
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// Load Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

import View from '../../ui/views/Practical';

class Practical extends React.PureComponent {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Practical');
  }

  shouldComponentUpdate() {
    return false;
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
  onUpdateHeaderTitle: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Practical);
