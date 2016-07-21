/**
*
* Link
*
*/

import React from 'react';
import { Link as ReactLink } from 'react-router';
import classnames from 'classnames';
import styles from './Link.scss';

const checkDomain = (url) => {
  let urlToCheck = url;
  if (urlToCheck.indexOf('//') === 0) {
    urlToCheck = location.protocol + urlToCheck;
  }

  return urlToCheck.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
};

const isExternal = (url) => (
    (url.indexOf(':') > -1 || url.indexOf('//') > -1) && checkDomain(location.href) !== checkDomain(url)
);

function Link({ to, children, className, activeClassName, ...rest }) {
  const linkClasses = classnames(styles.link, className);

  if (typeof to === 'string' && isExternal(to)) {
    return (
      <a href={to} className={linkClasses} {...rest}>{children}</a>
    );
  }

  return (
    <ReactLink to={to} className={linkClasses} activeClassName={activeClassName} {...rest} >{children}</ReactLink>
  );
}

Link.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
  className: React.PropTypes.string,
  activeClassName: React.PropTypes.string,
};

export default Link;
