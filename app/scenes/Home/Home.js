/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Link } from 'react-router';

import styles from './Home.scss';
import smoothScroll from 'smooth-scroll';

// Load content
import mainContent from '../../../content/homepage/main.md';

export class Home extends React.Component {

  componentDidMount() {
    smoothScroll.init();
  }

  render() {
    return (
      <div>
        <div className={styles.coverContainer}>
          <div className={styles.coverSpacer} />
          <div className={styles.coverTitleContainer}>
            <div className={styles.coverTitleContainerRow}>
              <h1>DIGITEC 2016: Digital Future</h1>
              <h2>29 November 2016</h2>
              <h2>The Square, BRUSSELS</h2>
            </div>
            <div className={styles.coverTitleContainerRow}>
              <Link className={styles.coverRegister} to={'/'}>Register</Link>
              <h2>#digitec16</h2>
            </div>
          </div>
          <div className={styles.coverExpand}>
            <a data-scroll href="#about"><i className="material-icons">expand_more</i></a>
          </div>
        </div>
        <div className={styles.contentContainer} id="about">
          <div className="mdl-cell mdl-cell--6-col" dangerouslySetInnerHTML={{ __html: mainContent.body }} />
        </div>
      </div>
    );
  }
}

export default Home;
