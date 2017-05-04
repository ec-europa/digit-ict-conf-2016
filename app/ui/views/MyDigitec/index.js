/*
 *
 * Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Load components
import EventsList from '../../components/Events/List';
import Link from '../../components/Link/Link';

// Load styles
import styles from './MyDigitec.scss';

class MyDigitec extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule || nextProps.myEvents !== this.props.myEvents;
  }

  render() {
    const { schedule, myEvents, onToggleEvent, location } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My DIGITEC</h1>
        </div>
        <div className={styles.intro}>
          <p>
            &quot;My DIGITEC&quot; helps you personalise your experience. Select your favourite sessions from <Link to={'/programme'}>DIGITEC programme</Link>.
          </p>
        </div>
        {myEvents.length > 0 && (
          <EventsList events={myEvents} schedule={schedule} onToggle={onToggleEvent} location={location} />
        )}
      </div>
    );
  }
}

MyDigitec.propTypes = {
  schedule: PropTypes.object,
  myEvents: PropTypes.array,
  onToggleEvent: PropTypes.func,
  location: PropTypes.object,
};

MyDigitec.defaultProps = {
  schedule: [],
};

export default MyDigitec;
