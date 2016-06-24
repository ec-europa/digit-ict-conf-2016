/**
*
* Item
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './Item.scss';

function Item({ children, to }) {
  return (
    <Link to={to} className={styles.link}>{children}</Link>
  );
}

Item.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.string,
};

Item.defaultProps = {
  to: '/',
};

export default Item;
