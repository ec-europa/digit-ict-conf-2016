/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */
 /* eslint-disable react/no-danger */

import React from 'react';
import { Link } from 'react-router-dom';

import Cover from './Cover';

// Load styles
import styles from './Home.scss';

class Home extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Cover />
        <div className={styles.about} id="about">
          <p>
            The IT departments of the European Commission (DIGIT) and the European Parliament (ITEC) have joined forces to organise <strong>DIGITEC 2016: Digital Future</strong>.
            The forum brought together the IT communities of the European institutions to share best practices to transform public administration through IT and to discuss how the digital future will shape the way of working in large organisations.
            See the Twitter highlights storified <a href="https://storify.com/digit/digitec-2016-highlights-of-the-day" target="_blank" rel="noopener noreferrer">here</a> and sketchnotes <a href="https://www.flickr.com/photos/cnichele65/albums/72157673302735714" target="_blank" rel="noopener noreferrer">here</a>.
          </p>
          <div className={styles.media}>
            <div className={styles.ratio}>
              <iframe src="https://www.youtube.com/embed/cUUrUkB4x-k" frameBorder="0" className={styles.full} allowFullScreen />
            </div>
          </div>
          <div className={styles.media}>
            <div className={styles.ratio}>
              <iframe src="https://www.youtube.com/embed/IaT0-J1tL0k" frameBorder="0" className={styles.full} allowFullScreen />
            </div>
          </div>
          <p>Watch the recorded presentations in the Gold Hall. Open the sessions in the <Link to="/programme">Programme</Link> to find all videos.</p>
          <div className={styles.media}>
            <div className={styles.ratio}>
              <iframe
                id="ls_embed_1477903842"
                src="//livestream.com/accounts/7777696/events/6575104/player?width=640&height=360&enableInfoAndActivity=true&autoPlay=true&mute=false"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className={styles.full}
              />
              <script
                type="text/javascript"
                data-embed_id="ls_embed_1477903842"
                src="//livestream.com/assets/plugins/referrer_tracking.js"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
