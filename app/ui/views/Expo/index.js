/*
 *
 * Expo
 *
 */

import React from 'react';

// Components
import ExpoList from './List';

// Styles
import styles from './Expo.scss';

class Expo extends React.PureComponent {
  render() {
    const { stands, location } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Expo</h1>
        </div>
        <ExpoList stands={stands} location={location} />
      </div>
    );
  }
}

Expo.propTypes = {
  location: React.PropTypes.object,
  stands: React.PropTypes.array,
};

export default Expo;
