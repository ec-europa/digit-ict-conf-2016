/**
*
* Events/Row
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Row.scss';

const Row = ({ speaker, location }) => (
  <div className={styles.speakerContainer}>
    <div className={styles.speakerPicture}>
      <Link
        to={{
          pathname: `/speaker/${speaker.id}`,
          state: {
            modal: true,
            returnTo: location.state && location.state.returnTo ? location.state.returnTo : location.pathname,
          },
        }}
      >
        <img src={`${__BASENAME__}/assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
      </Link>
    </div>
    <div className={styles.speakerInfo}>
      <h3>
        <Link
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
      </h3>
      <h4 className={styles.title}>{speaker.title}</h4>
    </div>
  </div>
);

Row.propTypes = {
  speaker: React.PropTypes.object,
  location: React.PropTypes.object,
};

Row.defaultProps = {
  speaker: {},
};

export default Row;
