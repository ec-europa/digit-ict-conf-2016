/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Speaker.scss';

const Speaker = ({ speaker, location }) => (
  <Link
    className={styles.item}
    to={{
      pathname: `/speaker/${speaker.id}`,
      state: {
        modal: true,
        returnTo: location.state && location.state.returnTo ? location.state.returnTo : location.pathname,
      },
    }}
  >
    <div className={styles.pictureFrame}>
      <img className={styles.picture} src={`${__BASENAME__}/assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
    </div>
    <div className={styles.name}>
      {speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span>
    </div>
    <div className={styles.title}>{speaker.title}</div>
  </Link>
);

Speaker.propTypes = {
  speaker: React.PropTypes.object,
  location: React.PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
