/**
*
* Content
*
*/

import React from 'react';
import styles from './styles.css';

function Content({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
