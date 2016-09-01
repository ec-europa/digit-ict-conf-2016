/**
*
* Import/Page
*
*/

import React from 'react';
import styles from './Page.scss';

const Page = ({ success, inputValue, onInputChange, onSubmit }) => (
  <div className={styles.container}>
    <h1>Import{success && ' successful!'}</h1>
    {success ?
      <p>
        Congratulations! You have successfully imported your schedule.
      </p>
      :
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
        />
        <input type="submit" value="Import" />
      </form>
    }
  </div>
);

Page.propTypes = {
  success: React.PropTypes.bool,
  inputValue: React.PropTypes.string,
  onInputChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
};

export default Page;
