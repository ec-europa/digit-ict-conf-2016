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
  }

  componentDidMount() {
    const { isModal } = this.props;
    if (!isModal) {
      if (this.state.speaker) {
        this.props.onUpdateHeaderTitle('Speaker details');
      } else {
        this.props.onUpdateHeaderTitle('Speaker not found');
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

    const { isModal, onRequestClose } = this.props;

    return (
      <div>
        <Helmet title={`${speaker.firstname} ${speaker.lastname}`} />
        {isModal
          ? <SpeakerModal speaker={speaker} location={location} onRequestClose={onRequestClose} />
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
  router: React.PropTypes.object,
  isModal: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

Speaker.defaultProps = {
  isModal: false,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Speaker));
