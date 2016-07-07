/**
*
* Events/List
*
*/

import React from 'react';
import Row from './Row';
import styles from './List.scss';

const List = ({ events, schedule, onToggle }) => {
  const eventsDisplay = [];

  const eventsByTimeslot = [];
  events.forEach(event => {
    if (!eventsByTimeslot[event.starts]) {
      eventsByTimeslot[event.starts] = [];
    }
    eventsByTimeslot[event.starts].push(event);
  });

  Object.keys(eventsByTimeslot).forEach(start => {
    const eventsList = eventsByTimeslot[start];

    const eventsRows = eventsList.map(event => (
      <Row key={event.id} event={event} checked={schedule[event.id]} onToggle={onToggle} displayTime={false} />
    ));

    const eventsEnds = eventsList[0].ends ? (
      <time>{eventsList[0].ends}</time>
    ) : null;

    eventsDisplay.push(
      <div className={styles.block} key={eventsList[0].starts} >
        <div className={styles.timeslot}>
          <time>{eventsList[0].starts}</time>{eventsEnds ? ' - ' : ''}{eventsEnds}
        </div>
        <div className={styles.events}>
          {eventsRows}
        </div>
      </div>
    );
  });

  return (
    <div>{eventsDisplay}</div>
  );
};

List.propTypes = {
  events: React.PropTypes.array,
  schedule: React.PropTypes.object,
  onToggle: React.PropTypes.func,
};

List.defaultProps = {
  events: [],
  schedule: [],
};

export default List;
