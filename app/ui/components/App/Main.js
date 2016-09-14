/**
 * Main
 */

import React from 'react';

import styles from './Main.scss';

class Main extends React.PureComponent {
  render() {
    const { children, drawerOpen, modalOpen } = this.props;
    return (
      <div aria-hidden={drawerOpen || modalOpen} className={styles.container}>
        {children}
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
  modalOpen: React.PropTypes.bool,
};

export default Main;
