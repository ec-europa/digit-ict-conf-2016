/**
*
* Item
*
*/

import React from 'react';
import Link from '../../../../Link/Link';
import styles from './Item.scss';
import classnames from 'classnames';

const Item = ({ to, children, mobileOnly, primary, ...rest }) => (
  <li
    className={classnames(
      styles.item,
      { [styles.mobileOnly]: mobileOnly }
    )}
  >
    <Link
      className={classnames(
        styles.link,
        { [styles.primary]: primary },
      )}
      activeClassName={styles.active}
      to={to}
      {...rest}
    >
      {children}
    </Link>
  </li>
);

Item.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
  mobileOnly: React.PropTypes.bool,
  primary: React.PropTypes.bool,
};

Item.defaultProps = {
  to: '/',
  mobileOnly: false,
  primary: false,
};

export default Item;