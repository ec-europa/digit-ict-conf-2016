/**
*
* HeaderToggle
*
*/

import React from 'react';
import styles from './styles.css';

function HeaderToggle({ onClick }) {
  return (
    <span className={styles.navToggle} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

HeaderToggle.propTypes = {
  onClick: React.PropTypes.func,
};


export default HeaderToggle;
