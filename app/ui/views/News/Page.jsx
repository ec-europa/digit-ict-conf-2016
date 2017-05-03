/**
*
* Speakers/Page
*
*/

import React from 'react';

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
  news: React.PropTypes.object,
};

Page.defaultProps = {
  news: {},
};

export default Page;
