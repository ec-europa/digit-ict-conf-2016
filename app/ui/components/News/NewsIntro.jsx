import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link/Link';

const NewsIntro = ({ news }) => (
  (typeof news === 'string' || news instanceof String) ? (
    <p>Loading article...</p>
  ) : (
    <article key={news.title}>
      <h3>{news.title}</h3>
      <p>{news.introduction}</p>
      <Link
        to={{
          pathname: `/news/${news.id}`,
          state: { modal: true },
        }}
      >
        Read more
      </Link>
    </article>
  )
);

NewsIntro.propTypes = {
  news: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default NewsIntro;
