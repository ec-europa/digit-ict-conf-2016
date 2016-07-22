/**
*
* Modal/Modal
*
*/

import React from 'react';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Styles
import styles from './Modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    // ESC
    if (event.keyCode === 27) {
      event.preventDefault();
      this.close();
    }
  }

  close() {
    const { router, returnTo, isOpen } = this.props;
    if (isOpen) {
      router.push(returnTo);
    }
  }

  render() {
    const { children, pathname, isOpen } = this.props;
    return (
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
      >
        {isOpen ?
          <div aria-hidden="false">
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
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <div className={styles.modalContainer} key={pathname}>
                <div className={styles.modalOutter} onClick={this.close} />
                <div className={styles.modal} role="dialog">
                  {children}
                </div>
              </div>
            </ReactCSSTransitionGroup>
            <div className={styles.closeButton} aria-label="Close the dialog" onClick={this.close} />
          </div>
          : null
        }
      </ReactCSSTransitionGroup>
    );
  }
}

Modal.propTypes = {
  children: React.PropTypes.node,
  pathname: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  router: React.PropTypes.object,
  returnTo: React.PropTypes.string,
};

export default withRouter(Modal);
