/**
*
* Link
*
* This component can't be pure as it depends on external parameters
* to determine if the link is active or not
*
*/

import React from 'react';
import { Link as NormalLink, IndexLink } from 'react-router';
import classnames from 'classnames';

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
        <IndexLink to={to} className={linkClasses} activeClassName={activeClassName} {...rest} >{children}</IndexLink>
      );
    }

    return (
      <NormalLink to={to} className={linkClasses} activeClassName={activeClassName} {...rest} >{children}</NormalLink>
    );
  }
}

Link.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
  className: React.PropTypes.string,
  activeClassName: React.PropTypes.string,
  index: React.PropTypes.bool,
};

export default Link;
