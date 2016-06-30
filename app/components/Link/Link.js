/**
*
* Link
*
*/

import React from 'react';
import { Link as ReactLink } from 'react-router';

const parseTo = (to) => {
  const parser = document.createElement('a');
  parser.href = to;
  return parser;
};

const isInternalLink = (toLocation) => window.location.host === toLocation.host;

function Link({ to, children, ...rest }) {
  const toLocation = parseTo(to);
  const isInternal = isInternalLink(toLocation);

  if (isInternal) {
    return (
      <ReactLink to={to} {...rest}>{children}</ReactLink>
    );
  }

  return (
    <a href={to} {...rest}>{children}</a>
  );
}

Link.propTypes = {
  children: React.PropTypes.node,
  to: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
};

export default Link;
