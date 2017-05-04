/**
*
* Link
*
* This component can't be pure as it depends on external parameters
* to determine if the link is active or not
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const checkDomain = (url) => {
  let urlToCheck = url;
  if (urlToCheck.indexOf('//') === 0) {
    urlToCheck = location.protocol + urlToCheck;
  }

  return urlToCheck.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
};

const isExternal = url => (
    (url.indexOf(':') > -1 || url.indexOf('//') > -1) && checkDomain(location.href) !== checkDomain(url)
);


class Link extends React.Component {
  render() {
    const { to, index, children, className, activeClassName, ...rest } = this.props;
    const linkClasses = classnames(className);

    if (typeof to === 'string' && isExternal(to)) {
      return (
        <a href={to} className={linkClasses} {...rest}>{children}</a>
      );
    }

    if (index) {
      return (
        <NavLink exact to={to} className={linkClasses} activeClassName={activeClassName} {...rest} >{children}</NavLink>
      );
    }

    return (
      <NavLink to={to} className={linkClasses} activeClassName={activeClassName} {...rest} >{children}</NavLink>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  index: PropTypes.bool,
};

export default Link;
