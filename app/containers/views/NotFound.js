/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Load Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Import View
import View from '../../ui/views/NotFound';

class NotFound extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Page Not Found');
  }

  render() {
    return (
      <div>
        <Helmet title="Page not found" />
        <View />
      </div>
    );
  }
}

NotFound.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(NotFound);
