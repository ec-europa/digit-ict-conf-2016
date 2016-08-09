/**
*
* Toggle
*
*/

import React from 'react';
import styles from './Toggle.scss';

const Toggle = ({ onClick }) => (
  <button className={styles.navToggle} onClick={onClick}>
    <span />
    <span />
    <span />
  </button>
);

Toggle.propTypes = {
  onClick: React.PropTypes.func,
};


export default Toggle;
