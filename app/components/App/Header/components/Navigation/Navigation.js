/**
*
* HeaderNavigation
*
*/

import React from 'react';
import styles from './Navigation.scss';

function HeaderNavigation({ children }) {
  return (
    <nav className={styles.container}>
      {children}
    </nav>
  );
}

HeaderNavigation.propTypes = {
  children: React.PropTypes.node,
};

export default HeaderNavigation;
