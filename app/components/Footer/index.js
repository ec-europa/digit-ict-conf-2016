/**
*
* Footer
*
*/

import React from 'react';
import { Footer as MDLFooter, FooterSection, FooterLinkList } from 'react-mdl';

import './styles.scss';

function Footer() {
  return (
    <MDLFooter size="mini">
      <FooterSection type="left" logo="DIGIT ICT 2016">
        <FooterLinkList>
          <a href="#">Cookies</a>
          <a href="#">Legal notice</a>
          <a href="#">Contact</a>
          <a href="#">Top</a>
        </FooterLinkList>
      </FooterSection>
      <FooterSection type="right">
        <FooterLinkList>
          <a href="#">European Commission</a>
          <a href="#">Parliament</a>
        </FooterLinkList>
      </FooterSection>
    </MDLFooter>
  );
}

export default Footer;
