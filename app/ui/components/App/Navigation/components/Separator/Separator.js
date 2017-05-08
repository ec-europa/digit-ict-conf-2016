/**
*
* Separator
*
*/

import React from 'react';
import styles from './Separator.scss';

class Separator extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <li className={styles.drawerSeparator} />;
  }
}

export default Separator;
