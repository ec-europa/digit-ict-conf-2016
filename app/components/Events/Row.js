/* global componentHandler */
/**
*
* Events/Row
*
*/

import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
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
    const { event, displayTime } = this.props;

    let timeAndVenue = '';
    if (displayTime) {
      timeAndVenue += `${event.starts}${event.ends ? ` - ${event.ends}` : ''}`;
    }
    if (event.venue && event.venue.length > 0) {
      timeAndVenue += displayTime
        ? `, ${event.venue}`
        : event.venue;
    }

    const rowClasses = classnames(
      styles.listItem,
      { [styles.blueItem]: event.color === 'blue' },
      { [styles.yellowItem]: event.color === 'yellow' },
      { [styles.purpleItem]: event.color === 'purple' },
      { [styles.greyItem]: event.color === 'grey' }
    );

    return (
      <li className={rowClasses}>
        <Link className={styles.primary} to={`/programme/${event.id}`}>
          <span className={styles.title}>{event.title}</span>
          <span className={styles.subtitle}>{timeAndVenue}</span>
        </Link>
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
  displayTime: React.PropTypes.bool,
};

Row.defaultProps = {
  event: {},
  displayTime: true,
};

export default Row;
