/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Load components
import View from '../../ui/views/Home';

// Load content
import mainContent from '../../../content/homepage/main.md';

class Home extends React.PureComponent {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('DIGITEC 2016');
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <View content={mainContent.body} />
      </div>
    );
  }
}

Home.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Home);
