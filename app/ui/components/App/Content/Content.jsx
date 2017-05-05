/**
* Content
*/

import React from 'react';
import PropTypes from 'prop-types';

import styles from './Content.scss';

class Content extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.contentKey !== this.props.contentKey;
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
  contentKey: PropTypes.string.isRequired,
};

Content.defaultProps = {
  children: null,
};

export default Content;
