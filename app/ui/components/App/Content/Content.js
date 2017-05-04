/**
* Content
*/

import React from 'react';
import PropTypes from 'prop-types';

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
  children: PropTypes.node,
};

export default Content;
