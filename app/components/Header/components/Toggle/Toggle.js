/**
*
* Toggle
*
*/

import React from 'react';
import styles from './Toggle.scss';

function Toggle({ onClick }) {
  return (
    <span className={styles.navToggle} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </span>
  );
}

Toggle.propTypes = {
  onClick: React.PropTypes.func,
};


export default Toggle;
