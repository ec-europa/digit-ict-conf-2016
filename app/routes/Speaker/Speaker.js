/*
 *
 * Speaker
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/layout';

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
    if (!props.location.state || !props.location.state.modal) {
      if (props.location.state) {
        props.location.state.returnTo = props.location.pathname; // eslint-disable-line
      } else {
        props.location.state = { // eslint-disable-line
          returnTo: props.location.pathname,
        };
      }
    }
  }

  componentDidMount() {
    this.props.onUpdateHeaderTitle('Speaker details');
  }

  render() {
    const { speaker } = this.state;
    const { location } = this.props;

    return (
      <div>
        <Helmet title={`${speaker.firstname} ${speaker.lastname}`} />
        {location.state && location.state.modal
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
  onUpdateHeaderTitle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Speaker));
