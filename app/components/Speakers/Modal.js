/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { connect } from 'react-redux';

// Redux actions
import { toggleEvent } from '../../store/modules/schedule';

// Styles
import styles from './Modal.scss';

// Content
import events from '../../../content/events.json';

// Components
import EventRow from '../Events/Row';
import Link from '../Link/Link';

// Images
import twitterLogo from './images/twitter.png';

const Modal = ({ speaker, schedule, onToggleEvent, location }) => {
  const speakerEvents = events.filter(event => event.speakers.indexOf(speaker.id) > -1 || event.moderator === speaker.id);
  const sessions = speakerEvents.length ? (
    <div>
      <h3>Session{speakerEvents.length > 1 ? 's' : ''}</h3>
      {speakerEvents.map(event => <EventRow key={event.id} event={event} checked={schedule[event.id]} onToggle={onToggleEvent} location={location} />)}
    </div>
  ) : '';

  const headerStyle = {
    background: `url(${__BASENAME__}/assets/images/speakers/${speaker.picture}) center 40% no-repeat`,
    backgroundSize: 'cover',
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader} style={headerStyle} role="img" aria-label={`${speaker.firstname} ${speaker.lastname}`} />
      <div className={styles.modalContent}>
        <h3>{speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span></h3>
        <h4 className={styles.title}>{speaker.title}</h4>
        <div className={styles.bio}>
          {speaker.bio.map((line, index) => (<p key={index}>{line}</p>))}
        </div>
        {speaker.twitter
         ? <Link className={styles.twitter} to={`https://twitter.com/${speaker.twitter.substr(1)}`} target="_blank" rel="noopener noreferrer"><img src={twitterLogo} alt="Twitter Feed" /> {speaker.twitter}</Link>
         : null
        }
        {sessions}
      </div>
    </div>
  );
};

Modal.propTypes = {
  speaker: React.PropTypes.object,
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  location: React.PropTypes.object,
};

Modal.defaultProps = {
  speaker: {},
  schedule: [],
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
