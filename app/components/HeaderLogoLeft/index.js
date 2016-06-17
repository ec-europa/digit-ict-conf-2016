/**
*
* HeaderLogoLeft
*
*/

import React from 'react';
import { Link } from 'react-router';

import ictLogo from './images/DIGITEC-logo_no-title.png';
import europaLogo from './images/europa.png';

import './styles.scss';

function HeaderLogoLeft() {
  return (
    <Link to={'/'}>
      <img srcSet={europaLogo} alt="DIGITEC 2016" className="mdl-layout--large-screen-only ict-logo" />
      <img srcSet={ictLogo} alt="DIGITEC 2016" className="mdl-layout--large-screen-only ict-logo" />
    </Link>
  );
}

export default HeaderLogoLeft;
