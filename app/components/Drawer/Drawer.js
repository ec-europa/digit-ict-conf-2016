/**
*
* Drawer
*
*/

import React from 'react';
import styles from './Drawer.scss';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    return this.props.onToggle();
  }

  render() {
    return (
      <div className={this.props.isOpen ? styles.isOpen : ''}>
        <div className={styles.obfuscator} onClick={this.toggle} />
        <div className={styles.container}>
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
