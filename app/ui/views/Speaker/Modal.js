/**
*
* Speakers/Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Modal.scss';

// Components
import EventRow from '../../components/Events/Row';
import Dialog from '../../components/Modal/Dialog';

// Images
import twitterLogo from './images/twitter.png';

class Modal extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    const {
      speaker,
      speakerEvents,
      schedule,
      onToggleEvent,
      onRequestClose,
    } = this.props;
    const sessions = speakerEvents.length
      ? <div>
          <h3>Session{speakerEvents.length > 1 ? 's' : ''}</h3>
          {speakerEvents.map(event => (
            <EventRow
              key={event.id}
              event={event}
              checked={schedule[event.id]}
              onToggle={onToggleEvent}
            />
          ))}
        </div>
      : '';

    const headerStyle = {
      background: `url(${speaker.picture}) center 40% no-repeat`,
      backgroundSize: 'cover',
    };

    const name = `${speaker.firstname} ${speaker.lastname}`;

    return (
      <Dialog
        id={speaker.id}
        title={name}
        description={`This modal introduces ${name}.`}
        onRequestClose={onRequestClose}
      >
        <div className={styles.modalContainer}>
          <div
            className={styles.modalHeader}
            style={headerStyle}
            role="img"
            aria-label={`${speaker.firstname} ${speaker.lastname}`}
          />
          <div className={styles.modalContent}>
            <h3>
              {speaker.firstname}
              {' '}
              <span className={styles.lastname}>{speaker.lastname}</span>
            </h3>
            <h4 className={styles.title}>{speaker.title}</h4>
            <div className={styles.bio}>
              {speaker.bio.map((line, index) => <p key={index}>{line}</p>)}
            </div>
            {speaker.twitter
              ? <a
                  className={styles.twitter}
                  href={`https://twitter.com/${speaker.twitter.substr(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={twitterLogo} alt="Twitter Feed" /> {speaker.twitter}
                </a>
              : null}
            {sessions}
          </div>
        </div>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  speaker: PropTypes.object,
  speakerEvents: PropTypes.array,
  schedule: PropTypes.object,
  onToggleEvent: PropTypes.func,
  onRequestClose: PropTypes.func,
};

Modal.defaultProps = {
  speaker: {},
  schedule: [],
};

export default Modal;
