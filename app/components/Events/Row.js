/* global componentHandler */
/**
*
* Events/Row
*
*/

import React from 'react';
// import Event from './Event';
import { Checkbox } from 'react-mdl';

class Row extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { event, onToggle } = this.props;
    return onToggle(event);
  }

  render() {
    const event = this.props.event;
    return (
      <li className="mdl-list__item mdl-list__item--two-line">
        <span className="mdl-list__item-primary-content">
          <span>{event.title}</span>
          <span className="mdl-list__item-sub-title">
            {event.starts}{event.ends ? ` - ${event.ends}` : ''}{event.venue && event.venue.length ? `, ${event.venue}` : ''}
          </span>
        </span>
        <span className="mdl-list__item-secondary-action">
          <Checkbox checked={event.attend} onChange={this.toggle} ripple />
        </span>
      </li>
    );
  }
}

Row.propTypes = {
  event: React.PropTypes.object,
  onToggle: React.PropTypes.func,
};

Row.defaultProps = {
  event: {},
};

export default Row;
