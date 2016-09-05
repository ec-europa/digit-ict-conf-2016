/**
*
* Export/Modal
*
*/

import React from 'react';

// Components
import Dialog from '../Modal/Dialog';
import styles from './Modal.scss';

const Modal = ({ onRequestClose, code, url }) => (
  <Dialog
    id="export"
    title="Export"
    description="This modal lets you export your data."
    onRequestClose={onRequestClose}
  >
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Export your schedule</h1>
      </div>
      <div className={styles.content}>
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
    </div>
  </Dialog>
);

Modal.propTypes = {
  onRequestClose: React.PropTypes.func,
  code: React.PropTypes.string,
  url: React.PropTypes.string,
};

export default Modal;
