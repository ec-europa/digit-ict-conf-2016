import React from 'react';

const NewsIntro = ({ news }) => (
  (typeof news === 'string' || news instanceof String) ? (
    <p>Loading article...</p>
  ) : (
    <article key={news.title}>
      <h3>{news.title}</h3>
      <p>{news.introduction}</p>
    </article>
  )
);

NewsIntro.propTypes = {
  news: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]).isRequired,
};

export default NewsIntro;
