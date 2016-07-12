/**
*
* HeaderNavigationItem
*
*/

import React from 'react';
import Link from '../../../../../Link/Link';
import classNames from 'classnames';
import styles from './Item.scss';

function HeaderNavigationItem({ children, to, primary, ...rest }) {
  const containerClasses = classNames(
    styles.item,
  );

  const linkClasses = classNames(
    styles.link,
    {
      [`${styles.primary}`]: primary,
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
  primary: React.PropTypes.bool,
};

HeaderNavigationItem.defaultProps = {
  to: '/',
  desktopOnly: false,
  primary: false,
};

export default HeaderNavigationItem;
