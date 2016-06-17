/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';

import './styles.scss';
import imageDB from '../../assets/images/speakers/davidborrelli.png';
import smoothScroll from 'smooth-scroll';

import coverImage from './images/cover.jpg';

export class HomePage extends React.Component {

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
          <div className="mdl-cell mdl-cell--6-col">
            <h3>Joint conference European Commission and the European Parliament</h3>
            <p>
              <strong>DIGITEC 2016: Digital Future</strong> will take place on <strong>November 29<sup>th</sup></strong>
              in Brussels. The 9th edition of the event will bring together the IT communities of the European
              institutions for interactive discussions on how to use digital technologies to do policy better and
              how the digital future will shape the way of working in the large organisations.
            </p>
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <h3>Speakers</h3>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col">
                <div className="ict-picture-frame ict-picture-frame--blue">
                  <img src={imageDB} alt="" className="ict-picture" />
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="ict-picture-frame ict-picture-frame--blue">
                  <img src={imageDB} alt="" className="ict-picture" />
                </div>
              </div>
              <div className="mdl-cell mdl-cell--4-col">
                <div className="ict-picture-frame ict-picture-frame--blue">
                  <img src={imageDB} alt="" className="ict-picture" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
