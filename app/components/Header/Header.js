/**
*
* Header
*
*/

import React from 'react';
import styles from './Header.scss';
import classnames from 'classnames';

function Header({ children, pinned, unpinned }) {
  const headerClasses = classnames(
    styles.container,
    { [styles.pinned]: pinned },
    { [styles.unpinned]: unpinned }
  );

  return (
    <div className={headerClasses}>
      {children}
    </div>
  );
}

Header.propTypes = {
  children: React.PropTypes.node,
  pinned: React.PropTypes.bool,
  unpinned: React.PropTypes.bool,
};


export default Header;
