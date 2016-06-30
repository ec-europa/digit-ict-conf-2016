/**
*
* Title
*
*/

import React from 'react';
import styles from './Title.scss';

function Title({ title }) {
  return (
    <div className={styles.container}><h1 className={styles.title}>{title}</h1></div>
  );
}

Title.propTypes = {
  title: React.PropTypes.string,
};


export default Title;
