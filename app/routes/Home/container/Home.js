/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Link from '../../../components/Link/Link';
import styles from './Home.scss';

import { updateHeaderTitle } from '../../../store/modules/layout';

// Load content
import mainContent from '../../../../content/homepage/main.md';

export class Home extends React.Component {

  componentDidMount() {
    this.props.onUpdateHeaderTitle('DIGITEC 2016');
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div className={styles.coverContainer}>
          <div className={styles.coverSpacer} />
          <div className={styles.coverTitleContainer}>
            <div className={styles.coverTitleContainerRow}>
              <h1>DIGITEC 2016: Digital Future</h1>
              <h2>29 November, 2016</h2>
              <h2>Square Brussels</h2>
            </div>
            <div className={styles.coverTitleContainerRow}>
              <a className={styles.coverRegister} href={'https://scic.ec.europa.eu/fmi/ezreg/DIGIT-ICT-2016'} target="_blank">Register</a>
              <h2><Link to={'https://twitter.com/hashtag/digitec16'} className={styles.coverTwitter} target="_blank">#digitec16</Link></h2>
            </div>
          </div>
        </div>
        <div className={styles.contentContainer} id="about">
          <div className="mdl-cell mdl-cell--6-col" dangerouslySetInnerHTML={{ __html: mainContent.body }} />
        </div>
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
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Home);
