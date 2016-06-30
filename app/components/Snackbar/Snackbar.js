/**
*
* Snackbar
*
*/

import React from 'react';
import styles from './Snackbar.scss';

function Snackbar({ message, onRequestUndo }) {
  return (
    <div className={styles.container}>
      {message}
      {onRequestUndo
        ? <span onClick={onRequestUndo}>Undo</span>
        : null
      }
    </div>
  );
}

Snackbar.propTypes = {
  message: React.PropTypes.string,
  onRequestUndo: React.PropTypes.func,
};

export default Snackbar;
