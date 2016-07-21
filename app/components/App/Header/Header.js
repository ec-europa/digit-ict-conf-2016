/**
*
* Header
*
*/

import React from 'react';
import Headroom from 'headroom.js';
import classnames from 'classnames';
import styles from './Header.scss';

export class Header extends React.Component {
  componentDidMount() {
    this.headroom = new Headroom(this.refs.header, {
      offset: 80,
      tolerance: 6,
      classes: {
        initial: styles.headroom,
        pinned: styles.headroomPinned,
        unpinned: styles.headroomUnpinned,
      },
    });
    this.headroom.init();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUnmount() {
    this.headroom.destroy();
  }

  render() {
    const { children } = this.props;

    const headerClasses = classnames(
      styles.container,
    );

    return (
      <header className={headerClasses} ref="header">
        <div className={styles.innerContainer}>
          {children}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  children: React.PropTypes.node,
};

export default Header;
