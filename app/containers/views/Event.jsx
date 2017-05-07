/*
 *
 * Event
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

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

class Event extends React.PureComponent {
  constructor(props) {
    super(props);

    const { eventId } = props.match.params;

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

  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    const { event } = this.state;
    const { isModal } = this.props;

    if (!event) {
      return (
        <div>
          <Helmet title="Event not found" />
          <EventNotFound />
        </div>
      );
    }

    const { onToggleEvent, schedule, onRequestClose } = this.props;
    const isChecked = schedule[event.id];

    const eventModerators = speakers.filter(
      speaker => event.moderator === speaker.id
    );
    const eventSpeakers = speakers
      .filter(speaker => event.speakers.indexOf(speaker.id) > -1)
      .sort(
        (a, b) => event.speakers.indexOf(a.id) - event.speakers.indexOf(b.id)
      );
    const eventGuests = speakers.filter(
      speaker => event.guests && event.guests.indexOf(speaker.id) > -1
    );

    return (
      <div>
        <Helmet title={event.title} />
        {isModal
          ? <EventModal
              event={event}
              eventModerators={eventModerators}
              eventSpeakers={eventSpeakers}
              eventGuests={eventGuests}
              checked={isChecked}
              onToggle={onToggleEvent}
              onRequestClose={onRequestClose}
            />
          : <EventPage
              event={event}
              eventModerators={eventModerators}
              eventSpeakers={eventSpeakers}
              eventGuests={eventGuests}
            />}
      </div>
    );
  }
}

Event.propTypes = {
  isModal: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      eventId: PropTypes.string,
    }),
  }).isRequired,
  onUpdateHeaderTitle: PropTypes.func,
  onRequestClose: PropTypes.func,
  onToggleEvent: PropTypes.func,
  schedule: PropTypes.object,
};

Event.defaultProps = {
  isModal: false,
  onUpdateHeaderTitle: () => {},
  onRequestClose: () => {},
  onToggleEvent: () => {},
  schedule: {},
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: event => {
      dispatch(toggleEvent(event));
    },
    onUpdateHeaderTitle: title => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
