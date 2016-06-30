/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

const Speaker = ({ speaker }) => (
  <div className={styles.item}>
    <Link className={styles.pictureFrame} to={`/speakers/${speaker.id}`}>
      <img className={styles.picture} src={`assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
    </Link>
    <div className={styles.name}>
      {speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span>
    </div>
    <div className={styles.title}>{speaker.title}</div>
  </div>
);

Speaker.propTypes = {
  speaker: React.PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
