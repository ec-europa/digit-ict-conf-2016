/*
 *
 * Speaker
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';
import { toggleEvent } from '../../store/modules/schedule';

// Content
import speakers from '../../../content/speakers.json';
import events from '../../../content/events.json';

// Views
import SpeakerModal from '../../ui/views/Speaker/Modal';
import SpeakerPage from '../../ui/views/Speaker/Page';
import SpeakerNotFound from '../../ui/views/Speaker/NotFound';

class Speaker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { speakerId } = props.match.params;

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

  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    const { speaker } = this.state;
    const { isModal } = this.props;

    // 404 Speaker Not Found
    if (!speaker) {
      return ([
        <Helmet title="Speaker not found" />,
        <SpeakerNotFound />,
      ]);
    }

    const { onRequestClose, schedule, onToggleEvent } = this.props;
    const speakerEvents = events.filter(event => event.speakers.indexOf(speaker.id) > -1 || (event.guests && event.guests.indexOf(speaker.id) > -1) || event.moderator === speaker.id);

    return (
      <div>
        <Helmet title={`${speaker.firstname} ${speaker.lastname}`} />
        {
          isModal
            ? <SpeakerModal speaker={speaker} speakerEvents={speakerEvents} schedule={schedule} onRequestClose={onRequestClose} onToggleEvent={onToggleEvent} />
            : <SpeakerPage speaker={speaker} speakerEvents={speakerEvents} schedule={schedule} onToggleEvent={onToggleEvent} />
        }
      </div>
    );
  }
}

Speaker.propTypes = {
  match: React.PropTypes.object,
  onUpdateHeaderTitle: React.PropTypes.func,
  schedule: React.PropTypes.object,
  isModal: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
  onToggleEvent: React.PropTypes.func,
};

Speaker.defaultProps = {
  isModal: false,
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Speaker));
