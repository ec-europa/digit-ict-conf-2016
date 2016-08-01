/**
*
* Notification
*
*/

import React from 'react';

// Styles
import styles from './Notification.scss';
import classNames from 'classnames';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.handleActionClick = this.handleActionClick.bind(this);
    this.dismissTimeout = setTimeout(props.onRequestClose, 45000);
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout);
  }

  handleActionClick(event) {
    const { action } = this.props;
    event.stopPropagation();
    action.callback();
  }

  render() {
    const { onRequestClose, title, body, action, className } = this.props;
    return (
      <div
        className={classNames(styles.notification, className)}
        onClick={onRequestClose}
        role="alertdialog"
      >
        <div className={styles.label}>
          <span className={styles.title}>{title}</span>
          <span className={styles.body}>{body}</span>
        </div>
        {action && action.label && action.callback ?
          <button
            className={styles.action}
            onClick={this.handleActionClick}
          >
            {action.label}
          </button>
          : null
        }
      </div>
    );
  }
}

Notification.propTypes = {
  className: React.PropTypes.string,
  onRequestClose: React.PropTypes.func,
  title: React.PropTypes.string,
  body: React.PropTypes.string,
  action: React.PropTypes.object,
};

export default Notification;
