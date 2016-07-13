/**
*
* Speakers/Modal
*
*/

import React from 'react';
import { connect } from 'react-redux';
import Portal from 'react-portal';

// Redux actions
import { openModal, closeModal } from '../../store/modules/layout';

// Styles
import styles from './Modal.scss';

export class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.beforeClose = this.beforeClose.bind(this);
  }

  componentWillMount() {
    this.transitionTimeouts = [];
  }

  componentWillUnmount() {
    this.transitionTimeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }

  onOpen(node) {
    this.props.dispatchOpenModal(this);

    if (this.props.onOpenModal) {
      this.props.onOpenModal();
    }

    node.className = `${styles.enter}`; // eslint-disable-line
    const timeout = setTimeout(() => {
      node.className = `${styles.enter} ${styles.enterActive}`; // eslint-disable-line
    }, 10);
    this.transitionTimeouts.push(timeout);
  }

  onClose() {
    this.props.dispatchCloseModal(this);

    if (this.props.onCloseModal) {
      this.props.onCloseModal();
    }
  }

  beforeClose(node, removeFromDom) {
    node.className = `${styles.leave}`; // eslint-disable-line
    const timeout = setTimeout(() => {
      node.className = `${styles.leave} ${styles.leaveActive}`; // eslint-disable-line
    }, 0);
    this.transitionTimeouts.push(timeout);

    const timeout2 = setTimeout(() => {
      removeFromDom();
    }, 300);
    this.transitionTimeouts.push(timeout2);
  }

  close() {
    return this.refs.modalPortal.closePortal();
  }

  render() {
    const { children, isOpen } = this.props;
    return (
      <Portal
        beforeClose={this.beforeClose}
        closeOnEsc
        onClose={this.onClose}
        onOpen={this.onOpen}
        isOpened={isOpen}
        ref="modalPortal"
      >
        <div className={styles.modalContainer} aria-hidden="false">
          <div className={styles.obfuscator} onClick={this.close} />
          <div className={styles.modal}>
            {children}
            <div className={styles.closeButton} aria-label="Close the dialog" onClick={this.close} />
          </div>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onOpenModal: React.PropTypes.func,
  onCloseModal: React.PropTypes.func,
  children: React.PropTypes.node,
  dispatchOpenModal: React.PropTypes.func,
  dispatchCloseModal: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenModal: (reference) => {
      dispatch(openModal(reference));
    },
    dispatchCloseModal: (reference) => {
      dispatch(closeModal(reference));
    },
  };
}

export default connect(null, mapDispatchToProps)(Modal);
