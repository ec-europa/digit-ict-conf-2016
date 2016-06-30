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
  }

  componentDidMount() {
    this.props.onOpenModal();
  }

  close() {
    return this.props.onCloseModal();
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.modalContainer} >
        <div className={styles.obfuscator} onClick={this.close} />
        <div className={styles.modal}>
          {children}
        </div>
        <div className={styles.closeButton} onClick={this.close} />
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
