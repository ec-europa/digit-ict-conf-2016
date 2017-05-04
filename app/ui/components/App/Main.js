/**
 * Main
 */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Main.scss';

class Main extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

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
  children: PropTypes.node,
  drawerOpen: PropTypes.bool,
  modalOpen: PropTypes.bool,
};

Main.defaultProps = {
  drawerOpen: false,
  modalOpen: false,
};

export default Main;
