/**
*
* Snackbar
*
*/

import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Snackbar.scss';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleActionClick = this.handleActionClick.bind(this);
    this.dismissTimeout = setTimeout(props.onRequestClose, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout);
  }

  handleActionClick(event) {
    const { action } = this.props;
    event.stopPropagation();
    action.onClick();
  }

  render() {
    const { onRequestClose, message, action, className } = this.props;
    return (
      <div
        className={classNames(styles.snackbar, className)}
        onClick={onRequestClose}
        role="alertdialog"
      >
        <div className={styles.message} dangerouslySetInnerHTML={{ __html: message }} />
        {action && action.label && action.onClick ?
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

Snackbar.propTypes = {
  className: React.PropTypes.string,
  onRequestClose: React.PropTypes.func,
  message: React.PropTypes.string,
  action: React.PropTypes.object,
};

export default Snackbar;
