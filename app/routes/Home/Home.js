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
import Cover from './components/Cover';

// Load styles
import styles from './Home.scss';

// Load content
import mainContent from '../../../content/homepage/main.md';

import { setContent } from '../../store/modules/ui/content';

class Home extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('DIGITEC 2016');
    this.props.dispatch(setContent(
      <div>
        <Helmet title="Home" />
        <Cover />
        <div className={styles.about} id="about" dangerouslySetInnerHTML={{ __html: mainContent.body }} />
      </div>
    ));
  }

  render() {
    return null;
  }
}

Home.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
  dispatch: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Home);
