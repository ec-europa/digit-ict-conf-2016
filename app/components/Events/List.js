/**
*
* Events/List
*
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FlipMove from 'react-flip-move';
import Row from './Row';
import styles from './List.scss';

const List = ({ events, schedule, onToggle, location }) => {
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
      <Row key={event.id} event={event} checked={schedule[event.id]} onToggle={onToggle} displayTime={false} location={location} />
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
          <FlipMove
            easing="ease"
            duration="700"
            staggerDurationBy="15"
            staggerDelayBy="20"
          >
            {eventsRows}
          </FlipMove>
        </div>
      </div>
    );
  });

  return (
    <div>
      <FlipMove
        easing="ease"
        duration="700"
        staggerDurationBy="15"
        staggerDelayBy="20"
      >
        {eventsDisplay}
      </FlipMove>
    </div>
  );
};

List.propTypes = {
  events: React.PropTypes.array,
  schedule: React.PropTypes.object,
  onToggle: React.PropTypes.func,
  location: React.PropTypes.object,
};

List.defaultProps = {
  events: [],
  schedule: [],
};

export default List;
