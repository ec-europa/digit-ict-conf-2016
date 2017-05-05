/*
 *
 * Programme
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import EventsList from '../../components/Events/List';

// Styles
import styles from './Programme.scss';


class Programme extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    const { schedule, events, onToggleEvent, location } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Programme</h1>
        </div>
        <div className={styles.intro}>
          <p>
            Choose and save your favourite sessions to <Link to={'/my-digitec'}>My DIGITEC</Link>.
          </p>
        </div>
        <EventsList events={events} schedule={schedule} onToggle={onToggleEvent} location={location} />
      </div>
    );
  }
}

Programme.propTypes = {
  schedule: PropTypes.object,
  events: PropTypes.array,
  onToggleEvent: PropTypes.func,
  location: PropTypes.object,
};

Programme.defaultProps = {
  schedule: [],
};

export default Programme;
