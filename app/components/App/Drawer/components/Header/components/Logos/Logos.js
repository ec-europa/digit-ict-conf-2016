/**
*
* Logos
*
*/

import React from 'react';
import Link from '../../../../../../Link/Link';
import europaLogo from './images/europa.png';
import ictLogo from './images/digitec.png';
import styles from './Logos.scss';

function Logos() {
  return (
    <div className={styles.container}>
      <Link to={'http://europa.eu/index_en.htm'} target="_blank" className={styles.link}>
        <img src={europaLogo} className={styles.europaLogo} alt="DIGITEC 2016" />
      </Link>
      <Link to={'/'} className={styles.link}>
        <img src={ictLogo} className={styles.ictLogo} alt="DIGITEC 2016" />
      </Link>
    </div>
  );
}

export default Logos;
