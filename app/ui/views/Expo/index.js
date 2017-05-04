/*
 *
 * Expo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import ExpoList from './List';

// Styles
import styles from './Expo.scss';

class Expo extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { stands } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Expo</h1>
        </div>
        <ExpoList stands={stands} />
      </div>
    );
  }
}

Expo.propTypes = {
  stands: PropTypes.array,
};

export default Expo;
