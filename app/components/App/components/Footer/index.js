/**
*
* Footer
*
*/

import React from 'react';
import styles from './styles.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={`${styles.section} ${styles.left}`}>
        <a href="#">Cookies</a>
        <a href="#">Legal notice</a>
        <a href="#">Contact</a>
        <a href="#">Top</a>
      </div>
      <div className={`${styles.section} ${styles.right}`}>
        <a href="#">European Commission</a>
        <a href="#">Parliament</a>
      </div>
    </footer>
  );
}

export default Footer;
