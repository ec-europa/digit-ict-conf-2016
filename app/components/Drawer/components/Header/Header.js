/**
*
* Header
*
*/

import React from 'react';
import styles from './Header.scss';

function Header({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Header.propTypes = {
  children: React.PropTypes.node,
};

export default Header;
