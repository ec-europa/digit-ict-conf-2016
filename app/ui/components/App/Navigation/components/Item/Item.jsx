/**
*
* Item
*
* Not a PureComponent (same as Link)
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Item.scss';

class Item extends React.Component {
  render() {
    const { to, children, mobileOnly, primary, ...rest } = this.props;

    // Remove router's properties from "rest"
    delete rest.match;
    delete rest.location;
    delete rest.history;
    delete rest.staticContext;

    return (
      <li
        className={classnames(styles.item, { [styles.mobileOnly]: mobileOnly })}
      >
        <NavLink
          className={classnames(styles.link, { [styles.primary]: primary })}
          exact
          activeClassName={styles.active}
          to={to}
          {...rest}
        >
          {children}
        </NavLink>
      </li>
    );
  }
}

Item.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  mobileOnly: PropTypes.bool,
  primary: PropTypes.bool,
};

Item.defaultProps = {
  children: null,
  to: '/',
  location: {
    pathname: '',
  },
  mobileOnly: false,
  primary: false,
};

export default Item;
