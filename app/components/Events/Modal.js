/**
*
* Speakers/Modal
*
*/

import React from 'react';
import classnames from 'classnames';

// Components
import SpeakerRow from '../Speakers/Row';

// Styles
import styles from './Modal.scss';

// Content
import speakers from '../../../content/speakers.json';

const Modal = ({ event, location }) => {
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
  const eventSpeakers = speakers
    .filter(speaker => event.speakers.indexOf(speaker.id) > -1)
    .sort((a, b) => event.speakers.indexOf(a.id) - event.speakers.indexOf(b.id));

  const moderatorBlock = eventModerator.length ? (
    <div>
      <h2>Moderator</h2>
      {eventModerator.map(speaker => (
        <SpeakerRow key={speaker.id} speaker={speaker} location={location} />
      ))}
    </div>
  ) : null;

  const speakersBlock = eventSpeakers.length ? (
    <div>
      <h2>Speaker{eventSpeakers.length > 1 ? 's' : ''}</h2>
      {eventSpeakers.map(speaker => (
        <SpeakerRow key={speaker.id} speaker={speaker} location={location} />
      ))}
    </div>
  ) : null;

  const headerClass = classnames(
    styles.modalHeader,
    { [styles.blue]: event.color === 'blue' },
    { [styles.yellow]: event.color === 'yellow' },
    { [styles.purple]: event.color === 'purple' },
    { [styles.grey]: event.color === 'grey' }
  );

  return (
    <div className={styles.modalContainer}>
      <div className={headerClass}>
        <h1>{event.title}</h1>
        <h2>{startsAt}{event.ends ? ' - ' : ''}{endsAt}{venue}</h2>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.name}>
          {event.visual && (
            <img className={styles.visual} src={`${__BASENAME__}/assets/images/events/${event.visual}`} alt={event.title} />
          )}
          {event.description.map((line, index) => (<p key={index}>{line}</p>))}
        </div>
        {moderatorBlock}
        {speakersBlock}
      </div>
    </div>
  );
};


Modal.propTypes = {
  event: React.PropTypes.object,
  location: React.PropTypes.object,
};

Modal.defaultProps = {
  event: {},
};


export default Modal;
