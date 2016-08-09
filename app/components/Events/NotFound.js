/**
 * NotFound
 */

import React from 'react';

// Load styles
import styles from './Modal.scss';

const NotFound = () => (
  <div className={styles.pageContainer}>
    <h1>Event not found</h1>
    <p>We couldn't find the requested event...</p>
  </div>
);

export default NotFound;
