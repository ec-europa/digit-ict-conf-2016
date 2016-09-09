/**
 * Main
 */

import React from 'react';

import styles from './App.scss';

const Main = ({ children, drawerOpen, modalOpen }) => (
  <div aria-hidden={drawerOpen || modalOpen} className={styles.container}>
    {children}
  </div>
);

Main.propTypes = {
  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
  modalOpen: React.PropTypes.bool,
};

export default Main;
