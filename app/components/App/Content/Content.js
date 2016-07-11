/**
*
* Content container
*
*/

import React from 'react';
import styles from './Content.scss';

const Content = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
