/**
*
* Cover
*
*/

import React from 'react';
import Link from '../../../components/Link/Link';
import styles from './Cover.scss';

const Cover = () => (
  <div className={styles.coverContainer}>
    <div className={styles.coverSpacer} />
    <div className={styles.coverTitleContainer}>
      <div className={styles.coverTitleContainerRow}>
        <h1>DIGITEC: Digital Future</h1>
        <h2>29 November 2016</h2>
        <h2>Square, Brussels</h2>
      </div>
      <div className={styles.coverTitleContainerRow}>
        <a className={styles.coverRegister} href={'https://scic.ec.europa.eu/fmi/ezreg/DIGIT-ICT-2016'} target="_blank">Register</a>
        <h2><Link to={'https://twitter.com/hashtag/digitec16'} className={styles.coverTwitter} target="_blank">#digitec16</Link></h2>
      </div>
    </div>
  </div>
);

export default Cover;
