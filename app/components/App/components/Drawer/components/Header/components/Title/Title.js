/**
*
* Title
*
*/

import React from 'react';
import styles from './styles.css';

function Title({ children }) {
  return (
    <div className={styles.container}>
      <h1>{children}</h1>
    </div>
  );
}

Title.propTypes = {
  children: React.PropTypes.node,
};

export default Title;
