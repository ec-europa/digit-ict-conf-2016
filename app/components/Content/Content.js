/**
*
* Content
*
*/

import React from 'react';
import styles from './Content.scss';

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
