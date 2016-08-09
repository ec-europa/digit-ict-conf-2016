/**
* Modal
*/

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Styles
import styles from './Modal.scss';

const Modal = ({ children, pathname, isOpen, close }) => (
  <ReactCSSTransitionGroup
    transitionName={{
      enter: styles.enter,
      enterActive: styles.enterActive,
      leave: styles.leave,
      leaveActive: styles.leaveActive,
    }}
    transitionEnterTimeout={400}
    transitionLeaveTimeout={400}
    component="div"
    aria-hidden={!isOpen}
  >
    {isOpen ?
      <div>
        <div className={styles.obfuscator} />
        <ReactCSSTransitionGroup
          transitionName={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            appear: styles.enter,
            appearActive: styles.enterActive,
            leave: styles.leave,
            leaveActive: styles.leaveActive,
          }}
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
        >
          <div className={styles.modalContainer} key={pathname}>
            <div className={styles.modalOuter} onClick={close} />
            <div className={styles.modal} role="dialog">
              {children}
            </div>
          </div>
        </ReactCSSTransitionGroup>
        <div className={styles.closeButton} aria-label="Close the dialog" onClick={close} />
      </div>
      : null
    }
  </ReactCSSTransitionGroup>
);

Modal.propTypes = {
  children: React.PropTypes.node,
  pathname: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  close: React.PropTypes.func,
};

export default Modal;
