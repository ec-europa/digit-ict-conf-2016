/**
*
* Events/List
*
*/

import React from 'react';
import Row from './Row';

const List = ({ events, onToggle }) => (
  <div>
    {events.map(event => <Row key={event.id} event={event} onToggle={onToggle} />)}
  </div>
);

List.propTypes = {
  events: React.PropTypes.array,
  onToggle: React.PropTypes.func,
};

List.defaultProps = {
  events: [],
};

export default List;
