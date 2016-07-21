/**
*
* Modal/Modal
*
*/

import React from 'react';
import { withRouter } from 'react-router';

// Styles
import styles from './Modal.scss';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
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
    const { router, returnTo } = this.props;
    return router.push(returnTo);
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.modalContainer} aria-hidden="false">
        <div className={styles.obfuscator} onClick={this.close} />
        <div className={styles.modal} role="dialog">
          {children}
        </div>
        <div className={styles.closeButton} aria-label="Close the dialog" onClick={this.close} />
      </div>
    );
  }
}

Modal.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.object,
  returnTo: React.PropTypes.string,
};

export default withRouter(Modal);
