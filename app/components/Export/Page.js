/**
*
* Export/Page
*
*/

import React from 'react';

const Page = ({ url }) => (
  <p>
    EXPORT:
    <img src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=${url}`} alt="QR Code" />
    <a href={decodeURI(url)}>open</a>
  </p>
);

Page.propTypes = {
  url: React.PropTypes.string,
};

export default Page;
