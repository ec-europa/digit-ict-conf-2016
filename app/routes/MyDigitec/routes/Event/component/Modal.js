/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { toggleEvent } from '../../../../../store/modules/events';
import styles from './Modal.scss';

const Modal = ({ event }) => (
  <div className={styles.container}>
    {event.title}
    <div className={styles.name}>
      {event.description.map((line, index) => (<p key={index}>{line}</p>))}
    </div>
  </div>
);

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
