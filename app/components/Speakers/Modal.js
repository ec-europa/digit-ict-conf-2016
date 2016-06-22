/**
*
* Speakers/Modal
*
*/

import React from 'react';
import styles from './Modal.scss';

const Modal = ({ speaker, events }) => (
  <div className={styles.container}>
    <img className={styles.picture} src={`./assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
    <div className={styles.name}>
      <h3>{speaker.firstname} {speaker.lastname}</h3>
    </div>
    <div className={styles.name}>
      {speaker.bio}
    </div>
    <div>
      <h3>Sessions</h3>
      {events.map(event => event.title)}
    </div>
  </div>
);

Modal.propTypes = {
  speaker: React.PropTypes.object,
  events: React.PropTypes.array,
};

Modal.defaultProps = {
  speaker: {},
  events: [],
};

export default Modal;
