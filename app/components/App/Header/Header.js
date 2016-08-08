/**
*
* Header
*
*/

import React from 'react';
import Headroom from 'headroom.js';
import classnames from 'classnames';
import styles from './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // Init
    this.header = null;
    this.headroom = null;
  }

  componentDidMount() {
    this.headroom = new Headroom(this.header, {
      offset: 80,
      tolerance: 6,
      classes: {
        initial: styles.headroom,
        pinned: styles.headroomPinned,
        unpinned: styles.headroomUnpinned,
      },
    });
    this.headroom.init();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.headroom.destroy();
  }

  handleKeyDown(event) {
    // Press on TAB
    if (event.keyCode === 9 && this.header.contains(event.target)) {
      this.headroom.pin();
    }
  }

  render() {
    const { children } = this.props;

    const headerClasses = classnames(
      styles.container,
    );

    return (
      <header className={headerClasses} ref={c => { this.header = c; }}>
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
