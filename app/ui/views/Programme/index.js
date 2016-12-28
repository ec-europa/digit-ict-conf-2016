/*
 *
 * Programme
 *
 */

import React from 'react';

// Components
import EventsList from '../../components/Events/List';
import Link from '../../components/Link/Link';

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
  schedule: React.PropTypes.object,
  events: React.PropTypes.array,
  onToggleEvent: React.PropTypes.func,
  location: React.PropTypes.object,
};

Programme.defaultProps = {
  schedule: [],
};

export default Programme;
