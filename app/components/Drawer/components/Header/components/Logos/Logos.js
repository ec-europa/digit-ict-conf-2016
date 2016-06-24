/**
*
* Logos
*
*/

import React from 'react';
import { Link } from 'react-router';
import europaLogo from './images/europa.gif';
import ictLogo from './images/digitec.gif';
import styles from './Logos.scss';

function Logos() {
  return (
    <div className={styles.container}>
      <Link to={'/'} className={styles.link}>
        <img srcSet={europaLogo} className={styles.europaLogo} alt="DIGITEC 2016" />
      </Link>
      <Link to={'/'} className={styles.link}>
        <img srcSet={ictLogo} className={styles.ictLogo} alt="DIGITEC 2016" />
      </Link>
    </div>
  );
}

export default Logos;
