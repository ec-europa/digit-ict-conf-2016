/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import styles from './styles.css';

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

    return (
      <div className={styles.item} onClick={this.handleClick}>
        <div className={'ict-picture-frame ict-picture-frame--blue'}>
          <img className="ict-picture" src={`./assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
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
