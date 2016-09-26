/*
 *
 * Stands
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Content
import stands from '../../../content/stands.json';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

import View from '../../ui/views/Stands';

class Stands extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Stands');
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Helmet title="Stands" />
        <View location={location} stands={stands} />
      </div>
    );
  }
}

Stands.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
  location: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Stands);
