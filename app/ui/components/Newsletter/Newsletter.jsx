import React from 'react';
import PropTypes from 'prop-types';
import NewsIntro from '../News/NewsIntro';

import styles from './Newsletter.scss';

const Newsletter = ({ newsletter, status }) => {
  if (newsletter.constructor !== Object) {
    return null;
  }

  if (Object.keys(newsletter).length === 0) {
    if (status === 'error') {
      return <p>Error, could not retrieve the newsletter!</p>;
    } else if (status === 'loading') {
      return <p>Loading...</p>;
    }

    return <p>Empty newsletter?</p>;
  }

  let media = null;
  if (newsletter.media && newsletter.media.type === 'video') {
    media = (
      <div className={styles.media}>
        <div className={styles.ratio}>
          <iframe
            src={newsletter.media.url}
            frameBorder="0"
            className={styles.full}
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  let newsList = null;

  if (status === 'done') {
    newsList = Array.isArray(newsletter.news)
      ? newsletter.news.map(news => <NewsIntro news={news} key={news.id} />)
      : <p>No news found</p>;
  } else if (status === 'loading') {
    newsList = <p>Loading...</p>;
  } else {
    newsList = <p>Error while fetching news</p>;
  }

  return (
    <section>
      <h2>{newsletter.title}</h2>
      {media}
      <p className={styles.newsIntro}>{newsletter.introduction}</p>
      <div className={styles.newsList}>
        {newsList}
      </div>
    </section>
  );
};

Newsletter.propTypes = {
  newsletter: PropTypes.shape({
    title: PropTypes.string,
    introduction: PropTypes.string,
    news: PropTypes.array,
  }).isRequired,
  status: PropTypes.string,
};

Newsletter.defaultProps = {
  status: 'loading',
};

export default Newsletter;
