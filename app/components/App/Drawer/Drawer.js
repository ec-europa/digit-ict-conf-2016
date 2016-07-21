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
    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
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
      <div className={containerClasses}>
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
