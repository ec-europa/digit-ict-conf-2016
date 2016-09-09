/**
*
* Events/Modal
*
*/

import React from 'react';
import classnames from 'classnames';

// Components
import SpeakerRow from '../Speakers/Row';
import Dialog from '../Modal/Dialog';
import Checkbox from './Checkbox';

// Styles
import styles from './Modal.scss';

// Content
import speakers from '../../../content/speakers.json';

const Modal = ({ event, location, checked, onRequestClose, onToggle }) => {
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

  const containerClass = classnames(
    styles.modalContainer,
    { [styles.blue]: event.color === 'blue' },
    { [styles.yellow]: event.color === 'yellow' },
    { [styles.purple]: event.color === 'purple' },
    { [styles.grey]: event.color === 'grey' }
  );

  return (
    <Dialog
      id={event.id}
      title={event.title}
      description={`This modal describes the event: ${event.title}.`}
      onRequestClose={onRequestClose}
    >
      <div className={containerClass}>
        <div className={styles.modalHeader}>
          <h1>{event.title}</h1>
          <h2>{startsAt}{event.ends ? ' - ' : ''}{endsAt}{venue}</h2>
        </div>
        <div className={styles.modalContent}>
          {event.register && (
            <div className={styles.checkbox}>
              <Checkbox event={event} checked={checked} onToggle={onToggle} idPrefix="ev-" />
            </div>
          )}
          <div className={styles.name}>
            {event.visual && (
              <img className={styles.visual} src={event.visual} alt={event.title} />
            )}
            {event.description.map((line, index) => (<p key={index}>{line}</p>))}
          </div>
          {moderatorBlock}
          {speakersBlock}
        </div>
      </div>
    </Dialog>
  );
};


Modal.propTypes = {
  event: React.PropTypes.object,
  location: React.PropTypes.object,
  onToggle: React.PropTypes.func,
  checked: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

Modal.defaultProps = {
  event: {},
  checked: false,
};


export default Modal;
