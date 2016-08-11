/**
 * Main
 */

import React from 'react';
import classnames from 'classnames';

import styles from './App.scss';

const Main = ({ children, drawerOpen, modalOpen }) => {
  const containerClasses = classnames(
    styles.container,
    { [`${styles.containerNoOverflow}`]: modalOpen }
  );

  return (
    <div aria-hidden={drawerOpen || modalOpen} className={containerClasses}>
      {children}
    </div>
  );
};

Main.propTypes = {
  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
  modalOpen: React.PropTypes.bool,
};

export default Main;
