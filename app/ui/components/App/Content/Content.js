/**
* Content
*/

import React from 'react';

import styles from './Content.scss';

class Content extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }

  render() {
    const { children } = this.props;
    return (
      <main className={styles.container}>
        {children}
      </main>
    );
  }
}

Content.propTypes = {
  children: React.PropTypes.node,
};

export default Content;
