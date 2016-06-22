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
      styles.superContainer,
      { [`${styles.isOpen}`]: isOpen }
    );

    return (
      <div className={containerClasses} >
        <div className={styles.obfuscator} onClick={this.close} />
        <div className={styles.spacerContainer} />
        <div className={styles.container}>
          <div className={styles.close} onClick={this.close} />
          {content}
        </div>
        <div className={styles.spacerContainer} />
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
