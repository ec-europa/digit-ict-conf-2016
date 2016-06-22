/**
*
* Footer
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Footer.scss';
import commissionLogo from './images/commission.png';
import parliamentLogo from './images/parliament.png';

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
        <Link to={'#'} className={styles.logoContainer}>
          <img src={commissionLogo} alt="European Commission" className={styles.logo} />
        </Link>
        <Link to={'#'} className={styles.logoContainer}>
          <img src={parliamentLogo} alt="European Parliament" className={styles.logo} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
