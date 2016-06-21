/**
*
* Header
*
*/

import React from 'react';
import styles from './header.css';

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
