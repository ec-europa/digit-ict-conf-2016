/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */
 /* eslint-disable react/no-danger */

import React from 'react';

import Cover from './Cover';

// Load styles
import styles from './Home.scss';

class Home extends React.PureComponent {
  render() {
    const { content } = this.props;
    return (
      <div>
        <Cover />
        <div className={styles.about} id="about" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }
}

Home.propTypes = {
  content: React.PropTypes.string,
};

export default Home;
