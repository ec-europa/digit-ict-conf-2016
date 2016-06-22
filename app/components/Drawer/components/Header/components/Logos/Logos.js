/**
*
* Logos
*
*/

import React from 'react';
import styles from './Logos.scss';

function Logos({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Logos.propTypes = {
  children: React.PropTypes.node,
};

export default Logos;
