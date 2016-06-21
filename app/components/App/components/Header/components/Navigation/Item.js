/**
*
* HeaderNavigationItem
*
*/

import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './styles.css';

function HeaderNavigationItem({ children, to, desktopOnly }) {
  const classes = classNames(
    styles.item,
    {
      [`${styles.desktopOnly}`]: desktopOnly,
    },
  );

  return (
    <div className={classes}>
      <Link to={to}>{children}</Link>
    </div>
  );
}

HeaderNavigationItem.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.string,
  desktopOnly: React.PropTypes.bool,
};

HeaderNavigationItem.defaultProps = {
  to: '/',
  desktopOnly: false,
};

export default HeaderNavigationItem;
