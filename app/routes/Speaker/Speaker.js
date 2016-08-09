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
import { updateHeaderTitle } from '../../store/modules/ui/header';
import { defineModal } from '../../store/modules/ui/modal';

// Content
import speakers from '../../../content/speakers.json';

// Components
import SpeakerModal from '../../components/Speakers/Modal';
import SpeakerPage from '../../components/Speakers/Page';
import SpeakerNotFound from '../../components/Speakers/NotFound';

class Speaker extends React.Component {
  constructor(props) {
    super(props);

    const { speakerId } = props.params;

    this.state = {
      speaker: speakers.filter(s => s.id === speakerId)[0],
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

    return true;
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    const { speaker } = this.state;

    if (location.state && location.state.modal) {
      const name = `${speaker.firstname} ${speaker.lastname}`;

      // Send modal's meta information
      dispatch(defineModal({
        id: speaker.id,
        title: name,
        description: `This modal introduces ${name}.`,
      }));
    }
  }

  componentDidMount() {
    const { location, dispatch } = this.props;
    if (!location.state || !location.state.modal) {
      if (this.state.speaker) {
        dispatch(updateHeaderTitle('Speaker details'));
      } else {
        dispatch(updateHeaderTitle('Speaker not found'));
      }
    }
  }

  render() {
    const { speaker } = this.state;

    // 404 Speaker Not Found
    if (!speaker) {
      return (
        <div>
          <Helmet title="Speaker not found" />
          <SpeakerNotFound />
        </div>
      );
    }

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
  dispatch: React.PropTypes.func,
  router: React.PropTypes.object,
};

export default connect()(withRouter(Speaker));
