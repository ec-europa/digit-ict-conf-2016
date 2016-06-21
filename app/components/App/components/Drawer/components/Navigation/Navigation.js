/**
*
* Navigation
*
*/

import React from 'react';
import styles from './styles.css';

function Navigation({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Navigation.propTypes = {
  children: React.PropTypes.node,
};

export default Navigation;
