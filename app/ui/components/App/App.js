/**
 * App
 */

import React from 'react';
import styles from './App.scss';

class App extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.app}>{children}</div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
