/**
*
* Item
*
* Not a PureComponent (same as Link)
*
*/

import React from 'react';
import classnames from 'classnames';
import Link from '../../../../Link/Link';
import styles from './Item.scss';

class Item extends React.Component {
  render() {
    const { to, children, mobileOnly, primary, ...rest } = this.props;
    return (
      <li
        className={classnames(
          styles.item,
          { [styles.mobileOnly]: mobileOnly },
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
  }
}

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
