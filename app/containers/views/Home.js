/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Load components
import View from '../../ui/views/Home';

class Home extends React.PureComponent {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('DIGITEC 2016');
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <View />
      </div>
    );
  }
}

Home.propTypes = {
  onUpdateHeaderTitle: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: title => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Home);
