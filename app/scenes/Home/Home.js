/*
 * Home
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import './styles.scss';
import smoothScroll from 'smooth-scroll';

import coverImage from './images/cover.jpg';
import mainContent from '../../../content/homepage/main.md';

export class Home extends React.Component {

  componentDidMount() {
    smoothScroll.init();
  }

  render() {
    return (
      <div>
        <div
          className="ict-home-cfa mdl-typography--text-center"
          style={{
            background: `#F3F3F3 url(${coverImage}) center 65% no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <h1>DIGITEC 2016: Digital Future</h1>
          <h2>29/11/2016 BRUSSELS</h2>
          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent ict-home-register">
            Register
          </button>
          <div className="ict-home-expand">
            <a data-scroll href="#about"><i className="material-icons">expand_more</i></a>
          </div>
        </div>
        <div className="mdl-grid ict-max-width-900" id="about">
          <div className="mdl-cell mdl-cell--6-col" dangerouslySetInnerHTML={{ __html: mainContent.body }} />
          <div className="mdl-cell mdl-cell--6-col">
            <h3>Speakers</h3>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="ict-picture-frame ict-picture-frame--blue">
                  <img src="./assets/images/speakers/davidborrelli.png" alt="" className="ict-picture" />
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="ict-picture-frame ict-picture-frame--blue">
                  <img src="./assets/images/speakers/davidborrelli.png" alt="" className="ict-picture" />
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="ict-picture-frame ict-picture-frame--blue">
                  <img src="./assets/images/speakers/davidborrelli.png" alt="" className="ict-picture" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
