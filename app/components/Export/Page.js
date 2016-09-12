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
    <p>
      Scan the QR code to have your "My DIGITEC" schedule directly on your mobile.
      For a better experience, don't forget to add the app to your home screen.
    </p>
    <p className={styles.code}>
      <img src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|0&chl=${url}`} alt="QR Code" />
    </p>
    <p>Or</p>
    <p>
      If you have already added DIGITEC to your home screen, you can simply import your "My DIGITEC" schedule using the following export code:
    </p>
    <div className={styles.hash}>
      {code.toUpperCase()}
    </div>
  </div>
);

Page.propTypes = {
  code: React.PropTypes.string,
  url: React.PropTypes.string,
};

export default Page;
