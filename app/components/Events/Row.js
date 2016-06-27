/* global componentHandler */
/**
*
* Events/Row
*
*/

import React from 'react';
import styles from './Row.scss';

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
      <li className={styles.listItem}>
        <span className={styles.primary}>
          <span>{event.title}</span>
          <span className={styles.subtitle}>
            {event.starts}{event.ends ? ` - ${event.ends}` : ''}{event.venue && event.venue.length ? `, ${event.venue}` : ''}
          </span>
        </span>
        <span className={styles.secondary}>
          <input id={event.id} type="checkbox" checked={event.attend} onChange={this.toggle} />
          <label htmlFor={event.id} />
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
