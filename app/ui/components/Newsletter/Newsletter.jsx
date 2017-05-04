import React from 'react';
import PropTypes from 'prop-types';
import NewsIntro from '../News/NewsIntro';

const Newsletter = ({ newsletter, status }) => {
  if (newsletter.constructor !== Object) {
    return null;
  }

  if (Object.keys(newsletter).length === 0) {
    if (status === 'error') {
      return (
        <p>Error, could not retrieve the newsletter!</p>
      );
    } else if (status === 'loading') {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <p>Empty newsletter?</p>
    );
  }

  return (
    <section>
      <h2>{newsletter.title}</h2>
      <p>{newsletter.introduction}</p>
      <div>
        {Array.isArray(newsletter.news) ? (
          newsletter.news.map(news => <NewsIntro news={news} key={news.id} />)
        ) : (
          <p>Loading news...</p>
        )}
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
