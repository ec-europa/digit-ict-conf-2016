/**
*
* Header
*
*/

import React from 'react';
import { Link } from 'react-router';
import { Header as MDLHeader, HeaderRow, Navigation } from 'react-mdl';

import HeaderLogoLeft from 'components/HeaderLogoLeft';
import './header.scss';

function Header() {
  const logo = <HeaderLogoLeft />;

  return (
    <MDLHeader transparent scroll={false} waterfall className="mainHeader">
      <HeaderRow title={logo}>
        <Navigation>
          <Link to={'/speakers'} className="mdl-layout--large-screen-only">Speakers</Link>
          <Link to={'/programme'} className="mdl-layout--large-screen-only">Programme</Link>
          <Link to={'/'}>Register</Link>
        </Navigation>
      </HeaderRow>
    </MDLHeader>
  );
}

export default Header;
