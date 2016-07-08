/**
*
* Speakers/Modal
*
*/

import React from 'react';
import styles from './Modal.scss';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.props.onOpenModal();
    document.addEventListener('keydown', this.handleKeyDown);
    document.body.setAttribute('aria-hidden', 'true');
  }

  componentWillUnmount() {
    document.body.setAttribute('aria-hidden', 'false');
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
    return this.props.onCloseModal();
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.modalContainer} aria-hidden="false">
        <div className={styles.obfuscator} onClick={this.close} />
        <div className={styles.modal}>
          {children}
          <div className={styles.closeButton} aria-label="Close the dialog" onClick={this.close} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onOpenModal: React.PropTypes.func,
  onCloseModal: React.PropTypes.func,
  children: React.PropTypes.node,
};

export default Modal;
