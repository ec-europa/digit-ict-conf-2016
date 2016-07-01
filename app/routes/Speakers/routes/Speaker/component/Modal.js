/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { toggleEvent, selectEventsBySpeaker } from '../../../../../store/modules/events';
import styles from './Modal.scss';
import EventRow from '../../../../../components/Events/Row';

const Modal = ({ speaker, events, onToggleEvent }) => {
  const sessions = events ? (
    <div>
      <h3>Session{events.length > 1 ? 's' : ''}</h3>
      {events.map(event => <EventRow key={event.id} event={event} onToggle={onToggleEvent} />)}
    </div>
  ) : '';

  const headerStyle = {
    background: `url(/assets/images/speakers/${speaker.picture}) center 40% no-repeat`,
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
      {sessions}
    </div>
  );
};


Modal.propTypes = {
  speaker: React.PropTypes.object,
  events: React.PropTypes.array,
  onToggleEvent: React.PropTypes.func,
};

Modal.defaultProps = {
  speaker: {},
  events: [],
};

function mapStateToProps(state, props) {
  return {
    events: selectEventsBySpeaker(state)(props.speaker),
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
