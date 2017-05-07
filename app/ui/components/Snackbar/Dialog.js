/**
*
* Snackbar/Dialog
*
*/
/* eslint-disable react/no-danger, jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Snackbar.scss';

class Dialog extends React.PureComponent {
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

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
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
        ref={c => {
          this.dialog = c;
        }}
      >
        <div
          className={styles.message}
          dangerouslySetInnerHTML={{ __html: message }}
        />
        {action && action.label && action.onClick
          ? <button
              className={styles.action}
              onClick={onTriggerAction}
              ref={c => {
                this.actionButton = c;
              }}
            >
              {action.label}
            </button>
          : null}
      </div>
    );
  }
}

Dialog.propTypes = {
  onRequestClose: PropTypes.func,
  onTriggerAction: PropTypes.func,
  message: PropTypes.string,
  timeout: PropTypes.number,
  action: PropTypes.object,
};

export default Dialog;
