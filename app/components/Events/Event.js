/**
*
* Events/Event
*
*/

import React from 'react';

const Event = ({ event }) => (
  <div>
    {event.id}
  </div>
);

Event.propTypes = {
  event: React.PropTypes.object,
};

Event.defaultProps = {
  event: {},
};

export default Event;
