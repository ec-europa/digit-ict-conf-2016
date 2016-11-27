/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';

// Load styles
import styles from './styles.scss';

class NotFound extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Page Not Found</h1>
        </div>
      </div>
    );
  }
}

export default NotFound;
