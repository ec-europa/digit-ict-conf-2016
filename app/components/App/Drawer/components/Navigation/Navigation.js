/**
*
* Navigation
*
*/

import React from 'react';
import styles from './Navigation.scss';

function Navigation({ children }) {
  return (
    <nav className={styles.container}>
      {children}
    </nav>
  );
}

Navigation.propTypes = {
  children: React.PropTypes.node,
};

export default Navigation;
