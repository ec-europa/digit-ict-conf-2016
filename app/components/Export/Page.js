/**
*
* Export/Page
*
*/

import React from 'react';
import styles from './Page.scss';

const Page = ({ url }) => (
  <div className={styles.container}>
    <h1>Export your schedule</h1>
    <p className={styles.code}>
      <img src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=${url}`} alt="QR Code" />
    </p>
    <p>Instructions...</p>
    <p>
      For testing purpose only: <a href={decodeURI(url)}>open</a> the link
    </p>
  </div>
);

Page.propTypes = {
  url: React.PropTypes.string,
};

export default Page;
