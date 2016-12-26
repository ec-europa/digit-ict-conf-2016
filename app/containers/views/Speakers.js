/*
 *
 * Speakers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Content
import speakers from '../../../content/speakers.json';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

import View from '../../ui/views/Speakers';

class Speakers extends React.PureComponent {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Speakers');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        <Helmet title="Speakers" />
        <View location={location} speakers={speakers} />
      </div>
    );
  }
}

Speakers.propTypes = {
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

export default connect(null, mapDispatchToProps)(Speakers);
