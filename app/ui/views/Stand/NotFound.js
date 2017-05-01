/**
 * NotFound
 */

import React from 'react';

// Load styles
import styles from './Page.scss';

class NotFound extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Speaker not found</h1>
        <p>We couldn&apos;t find the requested speaker...</p>
      </div>
    );
  }
}

export default NotFound;