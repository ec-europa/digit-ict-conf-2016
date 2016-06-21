/**
*
* HeaderNavigation
*
*/

import React from 'react';
import styles from './styles.css';

function HeaderNavigation({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

HeaderNavigation.propTypes = {
  children: React.PropTypes.node,
};

export default HeaderNavigation;
