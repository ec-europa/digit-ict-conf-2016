/**
*
* Toggle
*
*/

import React from 'react';
import styles from './Toggle.scss';

const Toggle = ({ onClick }) => (
  <span className={styles.navToggle} onClick={onClick}>
    <span />
    <span />
    <span />
  </span>
);

Toggle.propTypes = {
  onClick: React.PropTypes.func,
};


export default Toggle;
