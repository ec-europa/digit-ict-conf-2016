/**
*
* Snackbar
*
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Styles
import styles from './Snackbar.scss';

const Snackbar = ({ onRequestClose, onTriggerAction, open, message, action }) => (
  <ReactCSSTransitionGroup
    transitionName={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive,
    }}
    transitionEnterTimeout={300}
    transitionLeaveTimeout={300}
    component="div"
    aria-hidden={open}
  >
    {open ?
      <div
        className={styles.snackbar}
        onClick={onRequestClose}
        role="alertdialog"
        key={message}
      >
        <div className={styles.message} dangerouslySetInnerHTML={{ __html: message }} />
        {action && action.label && action.onClick ?
          <button
            className={styles.action}
            onClick={onTriggerAction}
          >
            {action.label}
          </button>
          : null
        }
      </div>
      : null}
  </ReactCSSTransitionGroup>
);

Snackbar.propTypes = {
  onRequestClose: React.PropTypes.func,
  onTriggerAction: React.PropTypes.func,
  open: React.PropTypes.bool,
  message: React.PropTypes.string,
  action: React.PropTypes.object,
};

export default Snackbar;
