/*
 * Gallery
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Load components
import View from '../../ui/views/Gallery';

// Load content
import gallery from '../../../content/gallery.json';

class Gallery extends React.PureComponent {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Gallery');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet title="Gallery" />
        <View photos={gallery} />
      </div>
    );
  }
}

Gallery.propTypes = {
  onUpdateHeaderTitle: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Gallery);
