/**
*
* Item
*
*/

import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function Item({ children, to }) {
  return (
    <div className={styles.container}>
      <Link to={to}>{children}</Link>
    </div>
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
