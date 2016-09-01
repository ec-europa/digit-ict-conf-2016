/**
*
* Export/Page
*
*/

import React from 'react';
import styles from './Page.scss';

const Page = ({ code, url }) => (
  <div className={styles.container}>
    <h1>Export your schedule</h1>
    <p className={styles.code}>
      <img src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=${url}`} alt="QR Code" />
    </p>
    <p>
      Or type the code: <strong>{code.toUpperCase()}</strong>
    </p>
    <p>Instructions...</p>
  </div>
);

Page.propTypes = {
  code: React.PropTypes.string,
  url: React.PropTypes.string,
};

export default Page;
