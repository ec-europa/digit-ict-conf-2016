/**
*
* Speakers/Page
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Modal.scss';

class Page extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.news !== this.props.news;
  }

  render() {
    const { news } = this.props;

    return (
      <div className={styles.pageContainer}>
        <h1>{news.title}</h1>
        <p>{news.body}</p>
      </div>
    );
  }
}

Page.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

Page.defaultProps = {
  news: {},
};

export default Page;
