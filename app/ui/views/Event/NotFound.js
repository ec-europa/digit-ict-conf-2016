/**
 * NotFound
 */

import React from 'react';

// Load styles
import styles from './Modal.scss';

class NotFound extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.pageContainer}>
        <h1>Event not found</h1>
        <p>We couldn&apos;t find the requested event...</p>
      </div>
    );
  }
}

export default NotFound;
