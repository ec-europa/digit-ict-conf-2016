/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import './speakers.scss';

export class Speaker extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = { imgLoaded: false };
  }

  handleClick() {
    // this.props.openSpeakerModal(this.props.speaker);
    // alert('you clicked on me');
  }

  render() {
    const speaker = this.props.speaker;
    const img = require(`../../assets/images/speakers/${speaker.picture}`); // eslint-disable-line global-require

    return (
      <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone speaker_col" onClick={this.handleClick}>
        <div className={'ict-picture-frame ict-picture-frame--blue'}>
          <img className="ict-picture" src={img} alt={`${speaker.firstname} ${speaker.lastname}`} />
        </div>
        <div className="speaker_name">
          {speaker.firstname} {speaker.lastname}
        </div>
      </div>
    );
  }
}

Speaker.propTypes = {
  speaker: React.PropTypes.object,
};

Speaker.defaultProps = {
  speaker: {},
};

export default Speaker;
