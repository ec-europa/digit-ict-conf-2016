/**
*
* Footer
*
*/

import React from 'react';
import Link from '../../Link/Link';
import styles from './Footer.scss';
import commissionLogo from './images/commission.png';
import parliamentLogo from './images/parliament.png';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={`${styles.section} ${styles.left}`}>
          <Link to="http://europa.eu/cookies/index_en.htm" target="_blank" rel="noopener noreferrer">Cookies</Link>
          <Link to="http://europa.eu/geninfo/legal_notices_en.htm" target="_blank" rel="noopener noreferrer">Legal notice</Link>
          <Link to="mailto:DIGITEC-CONFERENCE@ec.europa.eu">Contact</Link>
          <Link to="http://europa.eu/geninfo/query/index.do" target="_blank" rel="noopener noreferrer">Search</Link>
        </div>
        <div className={`${styles.section} ${styles.right}`}>
          <Link to={'http://ec.europa.eu/index_en.htm'} className={styles.logoContainer} target="_blank" rel="noopener noreferrer">
            <img src={commissionLogo} alt="European Commission" className={styles.logo} />
          </Link>
          <Link to={'http://www.europarl.europa.eu/portal/en'} className={styles.logoContainer} target="_blank" rel="noopener noreferrer">
            <img src={parliamentLogo} alt="European Parliament" className={styles.logo} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
