/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Speaker.scss';

const Speaker = ({ speaker }) => (
  <div className={styles.item}>
    <Link className={styles.pictureFrame} to={`/speakers/${speaker.id}`}>
      <img className={styles.picture} src={`${__BASENAME__}/assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
    </Link>
    <Link className={styles.name} to={`/speakers/${speaker.id}`}>
      {speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span>
    </Link>
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
