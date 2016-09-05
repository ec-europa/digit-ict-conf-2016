/**
*
* Import/Page
*
*/

import React from 'react';
import styles from './Page.scss';
import formStyles from './Form.scss';

const Page = ({ success, inputValue, onInputChange, onSubmit }) => (
  <div className={styles.container}>
    <h1>Import{success ? ' successful!' : ' my schedule'}</h1>
    {success ?
      <p>
        Congratulations! You have successfully imported your schedule.
      </p>
      :
      <div>
        <p>
          Type your code in the box below to import your schedule.
        </p>
        <form onSubmit={onSubmit} className={formStyles.form}>
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            className={formStyles.formInput}
            maxLength="5"
            placeholder="code"
          />
          <input type="submit" value="Import" className={formStyles.submit} />
        </form>
      </div>

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
