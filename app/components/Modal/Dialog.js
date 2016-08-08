/**
* Dialog
*/

import React from 'react';

// Styles
import styles from './Modal.scss';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBackwardTab = this.handleBackwardTab.bind(this);
    this.handleForwardTab = this.handleForwardTab.bind(this);
    this.findFocusableElements = this.findFocusableElements.bind(this);

    // Initializations
    this.focusableEls = [];
    this.lastFocusableEl = null;
    this.firstFocusableEl = null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.findFocusableElements();

    // Set focus on first item
    if (this.firstFocusableEl) {
      this.firstFocusableEl.focus();
    }

    // Scroll top
    this.modal.scrollTop = 0;
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
    // Press on TAB
    if (event.keyCode === 9) {
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

  render() {
    const { children, onRequestClose } = this.props;
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalOuter} onClick={onRequestClose} />
        <div className={styles.modal} role="dialog" ref={c => { this.modal = c; }}>
          <button className={styles.closeButton} aria-label="Close the dialog" onClick={onRequestClose} />
          {children}
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  children: React.PropTypes.node,
  onRequestClose: React.PropTypes.func,
};

export default Dialog;
