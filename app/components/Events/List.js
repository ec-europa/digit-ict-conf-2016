/**
*
* Events/List
*
*/

import React from 'react';
import Row from './Row';
import styles from './List.scss';

const List = ({ events, schedule, onToggle }) => {
  let previousStart = null;
  const eventsList = [];

  events.forEach(event => {
    if (event.starts !== previousStart) {
      eventsList.push(
        <div key={event.starts} className={styles.timeslot}>
          {event.starts}{event.ends ? ` - ${event.ends}` : ''}
        </div>);
      previousStart = event.starts;
    }
    eventsList.push(<Row key={event.id} event={event} checked={schedule[event.id]} onToggle={onToggle} displayTime={false} />);
  });

  return (
    <div>{eventsList}</div>
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
