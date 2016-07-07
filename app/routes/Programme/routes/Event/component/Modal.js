/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Modal.scss';
import speakers from '../../../../../../content/speakers.json';

const Modal = ({ event }) => {
  const startsAt = (
    <time>{event.starts}</time>
  );
  const endsAt = event.ends ? (
    <time>{event.ends}</time>
  ) : null;

  let venue = null;
  if (event.venue && event.venue.length > 0) {
    venue = `, ${event.venue}`;
  }

  const eventModerator = speakers.filter(speaker => event.moderator === speaker.id);
  const eventSpeakers = speakers.filter(speaker => event.speakers.indexOf(speaker.id) > -1);

  const moderatorBlock = eventModerator.length ? (
    <div>
      <h2>Moderator</h2>
      {eventModerator.map(speaker => (
        <div key={speaker.id} className={styles.speakerContainer}>
          <div className={styles.speakerPicture}>
            <Link to={`/speakers/${speaker.id}`}>
              <img src={`${__BASENAME__}/assets/images/speakers/${speaker.picture}`} alt="{speaker.firstname} {speaker.lastname}" />
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

  const speakersBlock = eventSpeakers.length ? (
    <div>
      <h2>Speaker{eventSpeakers.length > 1 ? 's' : ''}</h2>
      {eventSpeakers.map(speaker => (
        <div key={speaker.id} className={styles.speakerContainer}>
          <div className={styles.speakerPicture}>
            <Link to={`/speakers/${speaker.id}`}>
              <img src={`${__BASENAME__}/assets/images/speakers/${speaker.picture}`} alt="{speaker.firstname} {speaker.lastname}" />
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
      <h2>{startsAt}{event.ends ? ' - ' : ''}{endsAt}{venue}</h2>
      <div className={styles.name}>
        {event.description.map((line, index) => (<p key={index}>{line}</p>))}
      </div>
      {moderatorBlock}
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


export default Modal;
