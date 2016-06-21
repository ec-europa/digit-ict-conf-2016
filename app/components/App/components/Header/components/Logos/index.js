/**
*
* HeaderLogos
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

function HeaderLogos({ children }) {
  return (
    <div className={styles.container}>
      <Link to={'/'}>
        {children}
      </Link>
    </div>
  );
}

HeaderLogos.propTypes = {
  children: React.PropTypes.node,
};

export default HeaderLogos;
