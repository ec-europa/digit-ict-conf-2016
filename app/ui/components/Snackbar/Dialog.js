/**
*
* Snackbar/Dialog
*
*/
/* eslint-disable react/no-danger, jsx-a11y/no-static-element-interactions */

import React from 'react';

// Styles
import styles from './Snackbar.scss';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // Init
    this.dismissTimeout = null;
    this.actionButton = null;
  }

  componentDidMount() {
    const { timeout } = this.props;

    if (timeout) {
      this.dismissTimeout = setTimeout(this.props.onRequestClose, timeout);
    }
    document.addEventListener('keydown', this.handleKeyDown, true);
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout);
    document.removeEventListener('keydown', this.handleKeyDown, true);
  }

  handleKeyDown(event) {
    // Press on TAB
    if (event.keyCode === 9 && this.actionButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.actionButton.focus();
    }
  }

  render() {
    const { onRequestClose, onTriggerAction, message, action } = this.props;

    return (
      <div
        className={styles.snackbar}
        onClick={onRequestClose}
        role="alertdialog"
        ref={(c) => { this.dialog = c; }}
      >
        <div className={styles.message} dangerouslySetInnerHTML={{ __html: message }} />
        {action && action.label && action.onClick ?
          <button
            className={styles.action}
            onClick={onTriggerAction}
            ref={(c) => { this.actionButton = c; }}
          >
            {action.label}
          </button>
          : null
        }
      </div>
    );
  }
}

Dialog.propTypes = {
  onRequestClose: React.PropTypes.func,
  onTriggerAction: React.PropTypes.func,
  message: React.PropTypes.string,
  timeout: React.PropTypes.number,
  action: React.PropTypes.object,
};

export default Dialog;
