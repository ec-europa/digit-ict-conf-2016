import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './NewsIntro.scss';

const NewsIntro = ({ news }) =>
  typeof news === 'string' || news instanceof String
    ? <p>Loading article...</p>
    :
      <article className={styles.article} key={news.title}>
        <Link
          to={{
            pathname: `/news/${news.id}`,
            state: { modal: true },
          }}
          className={styles.link}
        />
        {news.image &&
          <div className={styles.articleImage}>
            <img
              src={`${__BASENAME__}/static/${news.image}`}
              alt={news.title}
            />
          </div>}
        <div className={styles.articleContent}>
          <h3>{news.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: news.introduction }} />
        </div>
      </article>
  ;

NewsIntro.propTypes = {
  news: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default NewsIntro;
