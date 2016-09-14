/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Speaker.scss';

class Speaker extends React.PureComponent {
  render() {
    const { speaker } = this.props;
    return (
      <Link
        className={styles.item}
        to={{
          pathname: `/speaker/${speaker.id}`,
          state: { modal: true },
        }}
      >
        <div className={styles.pictureFrame}>
          <img className={styles.picture} src={speaker.picture} alt={`${speaker.firstname} ${speaker.lastname}`} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            {speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span>
          </div>
          <div className={styles.title}>{speaker.title}</div>
        </div>
      </Link>
    );
  }
}

Speaker.propTypes = {
  speaker: React.PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
