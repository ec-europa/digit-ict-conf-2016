/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleEvent } from '../../../../../store/modules/events';
import styles from './Modal.scss';
import speakers from '../../../../../../content/speakers.json';

const Modal = ({ event }) => {
  let timeAndVenue = '';
  timeAndVenue += `${event.starts}${event.ends ? ` - ${event.ends}` : ''}`;
  if (event.venue && event.venue.length > 0) {
    timeAndVenue += `, ${event.venue}`;
  }

  const eventSpeakers = speakers.filter(speaker => speaker.sessions.indexOf(event.id) > -1);

  const speakersBlock = eventSpeakers.length ? (
    <div>
      <h2>Speaker{eventSpeakers.length > 1 ? 's' : ''}</h2>
      {eventSpeakers.map(speaker => (
        <div key={speaker.id} className={styles.speakerContainer}>
          <div className={styles.speakerPicture}>
            <Link to={`/speakers/${speaker.id}`}>
              <img src={`/assets/images/speakers/${speaker.picture}`} alt="{speaker.firstname} {speaker.lastname}" />
            </Link>
          </div>
          <div className={styles.speakerInfo}>
            <h3>{speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span></h3>
            <h4 className={styles.title}>{speaker.title}</h4>
          </div>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div className={styles.container}>
      <h1>{event.title}</h1>
      <h2>{timeAndVenue}</h2>
      <div className={styles.name}>
        {event.description.map((line, index) => (<p key={index}>{line}</p>))}
      </div>
      {speakersBlock}
    </div>
  );
};


Modal.propTypes = {
  event: React.PropTypes.object,
};

Modal.defaultProps = {
  event: {},
};

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Modal);
