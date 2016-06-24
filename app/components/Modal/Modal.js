/**
*
* Speakers/Modal
*
*/

import React from 'react';
import classnames from 'classnames';
import styles from './Modal.scss';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    return this.props.onCloseModal();
  }

  render() {
    const { content, isOpen } = this.props;
    const containerClasses = classnames(
      styles.modalContainer,
      { [`${styles.isOpen}`]: isOpen }
    );

    return (
      <div className={containerClasses} >
        <div className={styles.obfuscator} onClick={this.close} />
        <div className={styles.modal}>
          {content}
        </div>
        <div className={styles.closeButton} onClick={this.close} />
      </div>
    );
  }
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool,
  onOpenModal: React.PropTypes.func,
  onCloseModal: React.PropTypes.func,
  content: React.PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;
