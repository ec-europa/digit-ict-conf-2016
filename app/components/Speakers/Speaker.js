/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Speaker.scss';

const Speaker = ({ speaker, location }) => (
  <div className={styles.item}>
    <Link
      className={styles.pictureFrame}
      to={{
        pathname: `/speaker/${speaker.id}`,
        state: {
          modal: true,
          returnTo: location.state && location.state.returnTo ? location.state.returnTo : location.pathname,
        },
      }}
    >
      <img className={styles.picture} src={`${__BASENAME__}/assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
    </Link>
    <Link
      className={styles.name}
      to={{
        pathname: `/speaker/${speaker.id}`,
        state: {
          modal: true,
          returnTo: location.state && location.state.returnTo ? location.state.returnTo : location.pathname,
        },
      }}
    >
      {speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span>
    </Link>
    <div className={styles.title}>{speaker.title}</div>
  </div>
);

Speaker.propTypes = {
  speaker: React.PropTypes.object,
  location: React.PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
