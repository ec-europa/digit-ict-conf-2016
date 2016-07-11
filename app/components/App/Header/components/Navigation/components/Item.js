/**
*
* HeaderNavigationItem
*
*/

import React from 'react';
import Link from '../../../../../Link/Link';
import classNames from 'classnames';
import styles from './Item.scss';

function HeaderNavigationItem({ children, to, desktopOnly, register, ...rest }) {
  const containerClasses = classNames(
    styles.item,
    {
      [`${styles.desktopOnly}`]: desktopOnly,
    },
  );

  const linkClasses = classNames(
    styles.link,
    {
      [`${styles.register}`]: register,
    },
  );

  return (
    <div className={containerClasses}>
      <Link
        className={linkClasses}
        activeClassName={styles.active}
        to={to}
        {...rest}
      >
        {children}
      </Link>
    </div>
  );
}

HeaderNavigationItem.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.string,
  desktopOnly: React.PropTypes.bool,
  register: React.PropTypes.bool,
};

HeaderNavigationItem.defaultProps = {
  to: '/',
  desktopOnly: false,
  register: false,
};

export default HeaderNavigationItem;
