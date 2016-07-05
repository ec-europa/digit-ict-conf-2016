/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { toggleEvent } from '../../../../../store/modules/schedule';
import styles from './Modal.scss';
import EventRow from '../../../../../components/Events/Row';
import events from '../../../../../../content/events.json';
import Link from '../../../../../components/Link/Link';

const Modal = ({ speaker, schedule, onToggleEvent }) => {
  const speakerEvents = events.filter(event => speaker.sessions.indexOf(event.id) > -1);
  const sessions = speakerEvents ? (
    <div>
      <h3>Session{speakerEvents.length > 1 ? 's' : ''}</h3>
      {speakerEvents.map(event => <EventRow key={event.id} event={event} checked={schedule[event.id]} onToggle={onToggleEvent} />)}
    </div>
  ) : '';

  const headerStyle = {
    background: `url(${__BASENAME__}/assets/images/speakers/${speaker.picture}) center 40% no-repeat`,
    backgroundSize: 'cover',
  };

  return (
    <div className={styles.container}>
      <div className={styles.header} style={headerStyle} />
      <div>
        <h3>{speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span></h3>
        <h4 className={styles.title}>{speaker.title}</h4>
      </div>
      <div className={styles.bio}>
        {speaker.bio.map((line, index) => (<p key={index}>{line}</p>))}
      </div>
      {speaker.twitter
       ? <h6>Follow: <Link className={styles.title} to={`https://twitter.com/${speaker.twitter.substr(1)}`} target="_blank">{speaker.twitter}</Link></h6>
       : null
      }
      {sessions}
    </div>
  );
};


Modal.propTypes = {
  speaker: React.PropTypes.object,
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
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
