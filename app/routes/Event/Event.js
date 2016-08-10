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

// Components
import EventModal from '../../components/Events/Modal';
import EventPage from '../../components/Events/Page';
import EventNotFound from '../../components/Events/NotFound';

// Redux actions
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';
import { defineModal } from '../../store/modules/ui/modal';
import { setContent } from '../../store/modules/ui/content';

class Event extends React.Component {
  constructor(props) {
    super(props);

    const { eventId } = props.params;

    this.state = {
      event: events.filter(event => event.id === eventId)[0],
      isModal: props.location.state && props.location.state.modal,
    };
  }

  componentWillMount() {
    const { event, isModal } = this.state;

    if (!event) {
      return null;
    }

    const { onToggleEvent, schedule, dispatch } = this.props;
    const isChecked = schedule[event.id];

    // Send modal's meta information
    if (isModal) {
      return dispatch(defineModal({
        id: event.id,
        title: event.title,
        description: `This modal describes the event: ${event.title}.`,
        content: (
          <div>
            <Helmet title={event.title} />
            <EventModal event={event} location={location} checked={isChecked} onToggle={onToggleEvent} />
          </div>
        ),
      }));
    }

    if (!event) {
      return dispatch(setContent(
        <div>
          <Helmet title="Event not found" />
          <EventNotFound />
        </div>
      ));
    }

    return dispatch(setContent(
      <div>
        <Helmet title={event.title} />
        <EventPage event={event} location={location} />
      </div>
    ));
  }

  componentDidMount() {
    const { isModal, event } = this.state;
    if (!isModal) {
      if (event) {
        this.props.onUpdateHeaderTitle('Event details');
      } else {
        this.props.onUpdateHeaderTitle('Event not found');
      }
    }
  }

  render() {
    return null;
  }
}

Event.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  onUpdateHeaderTitle: React.PropTypes.func,
  onToggleEvent: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  schedule: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
    dispatch,
  };
}

export default connect(state => ({
  schedule: state.schedule,
}), mapDispatchToProps)(withRouter(Event));
