/**
*
* Import/Modal
*
*/

import React from 'react';
import Dialog from '../Modal/Dialog';
import styles from './Modal.scss';
import formStyles from './Form.scss';

const Modal = ({ success, inputValue, onInputChange, onSubmit, onRequestClose }) => (
  <Dialog
    id="export"
    title="Export"
    description="This modal lets you export your data."
    onRequestClose={onRequestClose}
  >
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Import{success ? ' successful!' : ' my schedule'}</h1>
      </div>
      <div className={styles.content}>
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
    </div>
  </Dialog>
);

Modal.propTypes = {
  success: React.PropTypes.bool,
  inputValue: React.PropTypes.string,
  onInputChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onRequestClose: React.PropTypes.func,
};

export default Modal;
