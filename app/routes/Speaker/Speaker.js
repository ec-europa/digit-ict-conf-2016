/*
 *
 * Speaker
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

// Content
import speakers from '../../../content/speakers.json';

// Components
import SpeakerModal from '../../components/Speakers/Modal';
import SpeakerPage from '../../components/Speakers/Page';

export class Speaker extends React.Component {
  constructor(props) {
    super(props);

    const { speakerId } = props.params;

    this.state = {
      speaker: speakers.filter(speaker => speaker.id === speakerId)[0],
    };

    // Force "returnTo" when accessing the page direclty
    if (props.location.action === 'POP') {
      props.location.state.returnTo = props.location.pathname; // eslint-disable-line
    }
  }

  render() {
    const { speaker } = this.state;
    const { location } = this.props;

    return (
      <div>
        <Helmet title={`${speaker.firstname} ${speaker.lastname}`} />
        {location.state && location.state.modal && location.action === 'PUSH'
          ? <SpeakerModal speaker={speaker} location={location} />
          : <SpeakerPage speaker={speaker} location={location} />
        }
      </div>
    );
  }
}

Speaker.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default withRouter(Speaker);
