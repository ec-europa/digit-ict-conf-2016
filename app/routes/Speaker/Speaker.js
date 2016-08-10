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
      isModal: props.location.state && props.location.state.modal,
    };

    console.log('Mounted');

    return true;
  }

  componentWillMount() {
    const { speaker, isModal } = this.state;

    // 404 Speaker Not Found
    if (!speaker) {
      return;
    }

    const { location, dispatch } = this.props;
    const name = `${speaker.firstname} ${speaker.lastname}`;

    if (isModal) {
      // Send modal's meta information
      dispatch(defineModal({
        id: speaker.id,
        title: name,
        description: `This modal introduces ${name}.`,
        content: (
          <div>
            <Helmet title={name} />
            <SpeakerModal speaker={speaker} location={location} />
          </div>
        ),
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
    const { speaker, isModal } = this.state;

    // 404 Speaker Not Found
    if (!speaker) {
      return (
        <div>
          <Helmet title="Speaker not found" />
          <SpeakerNotFound />
        </div>
      );
    }

    if (isModal) {
      return null;
    }

    const { location } = this.props;
    const name = `${speaker.firstname} ${speaker.lastname}`;

    return (
      <div>
        <Helmet title={name} />
        <SpeakerPage speaker={speaker} location={location} />
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
