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
    const { event, checked, displayTime } = this.props;

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

    const learnMore = (event.description && event.description.length > 0)
      || (event.speakers && event.speakers.length > 0)
      || (event.moderator && event.moderator.length > 0);

    return (
      <li className={rowClasses}>
        <div className={styles.primary}>
          <span className={styles.title}>{event.title}</span>
          <span className={styles.subtitle}>
            {timeAndVenue.length > 0
              ? <span className={styles.timeAndVenue}>{timeAndVenue}</span>
              : null
            }
            {learnMore
              ? <Link className={styles.learnMore} to={`/programme/${event.id}`}>Learn more</Link>
              : null
            }
          </span>
        </div>
        {event.register
          ? <span className={styles.secondary}>
            <input id={event.id} type="checkbox" checked={checked} onChange={this.toggle} />
            <label htmlFor={event.id} />
          </span>
          : null
        }
      </li>
    );
  }
}

Row.propTypes = {
  event: React.PropTypes.object,
  checked: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  displayTime: React.PropTypes.bool,
};

Row.defaultProps = {
  event: {},
  checked: false,
  displayTime: true,
};

export default Row;
