/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { updateHeaderTitle } from '../../actions/ui/header';

// Load components
import Cover from './components/Cover';

// Load styles
import styles from './Home.scss';

// Load content
import mainContent from '../../../content/homepage/main.md';

class Home extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('DIGITEC 2016');
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Cover />
        <div className={styles.about} id="about" dangerouslySetInnerHTML={{ __html: mainContent.body }} />
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
