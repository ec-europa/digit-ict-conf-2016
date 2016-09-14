/*
 *
 * Event
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Content
import events from '../../../content/events.json';
import speakers from '../../../content/speakers.json';

// Components
import EventModal from '../../ui/views/Event/Modal';
import EventPage from '../../ui/views/Event/Page';
import EventNotFound from '../../ui/views/Event/NotFound';

// Redux actions
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';

class Event extends React.Component {
  constructor(props) {
    super(props);

    const { eventId } = props.params;

    this.state = {
      event: events.filter(event => event.id === eventId)[0],
    };
  }

  componentDidMount() {
    const { isModal } = this.props;
    if (!isModal) {
      if (this.state.event) {
        this.props.onUpdateHeaderTitle('Event details');
      } else {
        this.props.onUpdateHeaderTitle('Event not found');
      }
    }
  }

  render() {
    const { event } = this.state;

    if (!event) {
      return (
        <div>
          <Helmet title="Event not found" />
          <EventNotFound />
        </div>
      );
    }

    const { isModal, onToggleEvent, schedule, onRequestClose } = this.props;
    const isChecked = schedule[event.id];

    const eventModerators = speakers.filter(speaker => event.moderator === speaker.id);
    const eventSpeakers = speakers
      .filter(speaker => event.speakers.indexOf(speaker.id) > -1)
      .sort((a, b) => event.speakers.indexOf(a.id) - event.speakers.indexOf(b.id));

    return (
      <div>
        <Helmet title={event.title} />
        {
          isModal
            ? <EventModal event={event} eventModerators={eventModerators} eventSpeakers={eventSpeakers} location={location} checked={isChecked} onToggle={onToggleEvent} onRequestClose={onRequestClose} />
            : <EventPage event={event} eventModerators={eventModerators} eventSpeakers={eventSpeakers} location={location} />
        }
      </div>
    );
  }
}

Event.propTypes = {
  params: React.PropTypes.object,
  onUpdateHeaderTitle: React.PropTypes.func,
  onToggleEvent: React.PropTypes.func,
  schedule: React.PropTypes.object,
  isModal: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

Event.defaultProps = {
  isModal: false,
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Event));
