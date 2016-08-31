/**
*
* Import/Page
*
*/

import React from 'react';
import styles from './Page.scss';

const Page = ({ success }) => (
  <div className={styles.container}>
    <h1>Import{success ? ' successful!' : ' failed...'}</h1>
    {success ?
      <p>
        Congratulations! You have successfully imported your schedule.
      </p>
      :
      <p>
        There seems to be an error with the data you've provided. Please re-try to export your schedule again.
      </p>
    }
  </div>
);

Page.propTypes = {
  success: React.PropTypes.bool,
};

export default Page;
