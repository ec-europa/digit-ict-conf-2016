/**
* ModalContainer
*/

import React from 'react';
import { withRouter } from 'react-router';

// Component
import Modal from '../components/Modal/Modal';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.close = this.close.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackwardTab = this.handleBackwardTab.bind(this);
    this.handleForwardTab = this.handleForwardTab.bind(this);
    this.findFocusableElements = this.findFocusableElements.bind(this);

    // Initializations
    this.focusableEls = [];
    this.lastFocusableEl = null;
    this.firstFocusableEl = null;
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
      this.findFocusableElements();
      if (this.firstFocusableEl) {
        this.firstFocusableEl.focus();
      }
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  findFocusableElements() {
    const focusableEls = this.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    this.focusableEls = Array.prototype.slice.call(focusableEls);
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
    this.firstFocusableEl = this.focusableEls[0];
  }

  handleKeyDown(event) {
    if (event.keyCode === 27) {
      // Press on ESC
      event.preventDefault();
      this.close();
    } else if (event.keyCode === 9) {
      // Press on TAB
      if (this.focusableEls.length === 1) {
        event.preventDefault();
        return;
      }

      // Is SHIFT pressed?
      if (event.shiftKey) {
        this.handleBackwardTab(event);
      } else {
        this.handleForwardTab(event);
      }
    }
  }

  handleBackwardTab(event) {
    if (document.activeElement === this.firstFocusableEl) {
      event.preventDefault();
      this.lastFocusableEl.focus();
    }
  }

  handleForwardTab(event) {
    if (document.activeElement === this.lastFocusableEl) {
      event.preventDefault();
      this.firstFocusableEl.focus();
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
      <div ref={c => { this.modal = c; }}>
        <Modal pathname={pathname} isOpen={isOpen} close={this.close}>
          {children}
        </Modal>
      </div>
    );
  }
}

ModalContainer.propTypes = {
  children: React.PropTypes.node,
  pathname: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  router: React.PropTypes.object,
  returnTo: React.PropTypes.string,
};

export default withRouter(ModalContainer);
