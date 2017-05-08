/**
* Dialog
*/

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Modal.scss';

class Dialog extends React.PureComponent {
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

    // Remove focus from previous item
    document.activeElement.blur();

    // Scroll top
    this.modal.scrollTop = 0;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  findFocusableElements() {
    const focusableEls = this.modal.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
    );
    this.focusableEls = Array.prototype.slice.call(focusableEls);
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
    this.firstFocusableEl = this.focusableEls[0];
  }

  handleKeyDown(event) {
    // Press on TAB
    if (event.keyCode === 9) {
      if (this.focusableEls.length === 1) {
        event.preventDefault();
        this.lastFocusableEl.focus();
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

    if (this.focusableEls && this.focusableEls.indexOf(event.target) < 0) {
      event.preventDefault();
      this.lastFocusableEl.focus();
    }
  }

  handleForwardTab(event) {
    if (document.activeElement === this.lastFocusableEl) {
      event.preventDefault();
      this.firstFocusableEl.focus();
    }

    if (this.focusableEls && this.focusableEls.indexOf(event.target) < 0) {
      event.preventDefault();
      this.firstFocusableEl.focus();
    }
  }

  render() {
    const { children, onRequestClose, id, title, description } = this.props;
    return (
      <div className={styles.modalContainer}>
        <button className={styles.modalOuter} onClick={onRequestClose} />
        <div
          className={styles.modal}
          id={id}
          role="dialog"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          ref={c => {
            this.modal = c;
          }}
        >
          <h1 id="dialog-title" className="sr-only">{title}</h1>
          <p id="dialog-description" className="sr-only">{description}</p>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close dialog"
            onClick={onRequestClose}
          />
          {children}
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  children: PropTypes.node,
  onRequestClose: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Dialog;
