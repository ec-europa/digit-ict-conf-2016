/**
*
* Drawer
*
*/

import React from 'react';
import classnames from 'classnames';
import styles from './Drawer.scss';

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.toggle = this.toggle.bind(this);

    // Init
    this.drawer = null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('focus', this.handleFocusChange, true);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('focus', this.handleFocusChange, true);
  }

  handleKeyDown(event) {
    // Press on ESC
    if (this.props.isOpen && event.keyCode === 27) {
      event.preventDefault();
      this.toggle();
    }
  }

  handleFocusChange(event) {
    if (!this.props.isOpen && this.drawer.contains(document.activeElement)) {
      this.toggle();
      event.preventDefault();
    } else if (this.props.isOpen && !this.drawer.contains(document.activeElement)) {
      this.toggle();
      event.preventDefault();
    }
  }

  toggle() {
    return this.props.onToggle();
  }

  render() {
    const containerClasses = classnames(
      styles.container,
      { [styles.isOpen]: this.props.isOpen },
    );

    return (
      <div className={containerClasses} aria-hidden={!this.props.isOpen} ref={c => { this.drawer = c; }}>
        <div className={styles.obfuscator} onClick={this.toggle} />
        <div className={styles.innerContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Drawer.propTypes = {
  children: React.PropTypes.node,
  isOpen: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
};

export default Drawer;
