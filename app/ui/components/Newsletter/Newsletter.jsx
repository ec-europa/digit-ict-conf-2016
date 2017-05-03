import React from 'react';

const Newsletter = ({ newsletter }) => (
  Object.keys(newsletter).length === 0 && newsletter.constructor === Object ? (
    <p>Loading...</p>
  ) : (
    <section>
      <h2>{newsletter.title}</h2>
      <p>{newsletter.introduction}</p>
      <div>
        {Array.isArray(newsletter.news) ? (
          newsletter.news.map(news => (
            <article>
              <h3>{news.title}</h3>
              <p>{news.introduction}</p>
            </article>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    </section>
  )
);

export default Newsletter;
