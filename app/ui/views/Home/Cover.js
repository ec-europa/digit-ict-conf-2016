/**
*
* Cover
*
*/

import React from 'react';
import Link from '../../components/Link/Link';
import styles from './Cover.scss';

class Cover extends React.PureComponent {
  render() {
    return (
      <div className={styles.coverContainer}>
        <div className={styles.coverSpacer} />
        <div className={styles.coverTitleContainer}>
          <div className={styles.coverTitleContainerRow}>
            <h1>DIGITEC: Digital Future</h1>
            <h2>29 November 2016</h2>
            <h2>Square, Brussels</h2>
          </div>
          <div className={styles.coverTitleContainerRow}>
            <p className={styles.coverRegister}>Registration closed</p>
            <h2><Link to={'https://twitter.com/hashtag/digitec16'} className={styles.coverTwitter} target="_blank" rel="noopener noreferrer">#digitec16</Link></h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Cover;
