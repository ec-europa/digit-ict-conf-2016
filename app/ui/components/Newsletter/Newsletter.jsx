import React from 'react';
import PropTypes from 'prop-types';
import NewsIntro from '../News/NewsIntro';

const Newsletter = ({ newsletter }) => (
  Object.keys(newsletter).length === 0 && newsletter.constructor === Object ? (
    <p>Loading...</p>
  ) : (
    <section>
      <h2>{newsletter.title}</h2>
      <p>{newsletter.introduction}</p>
      <div>
        {Array.isArray(newsletter.news) ? (
          newsletter.news.map((news, index) => <NewsIntro news={news} key={index} />)
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    </section>
  )
);

Newsletter.propTypes = {
  newsletter: PropTypes.object.isRequired,
};

export default Newsletter;
