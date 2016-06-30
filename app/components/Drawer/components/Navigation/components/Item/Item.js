/**
*
* Item
*
*/

import React from 'react';
import Link from '../../../../../Link/Link';
import styles from './Item.scss';

const Item = ({ to, children, ...rest }) => (
  <Link
    className={styles.link}
    activeClassName={styles.active}
    to={to}
    {...rest}
  >
    {children}
  </Link>
);

Item.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
};

export default Item;
