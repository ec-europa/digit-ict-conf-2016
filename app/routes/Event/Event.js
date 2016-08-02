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

// Redux actions
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/layout';

class Event extends React.Component {
  constructor(props) {
    super(props);

    const { eventId } = props.params;

    this.state = {
      event: events.filter(event => event.id === eventId)[0],
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
    const { location } = this.props;
    if (!location.state || !location.state.modal) {
      this.props.onUpdateHeaderTitle('Event details');
    }
  }

  render() {
    const { event } = this.state;
    const { location, onToggleEvent, schedule } = this.props;

    const isChecked = schedule[event.id];

    return (
      <div>
        <Helmet title={event.title} />
        {location.state && location.state.modal
          ? <EventModal event={event} location={location} checked={isChecked} onToggle={onToggleEvent} />
          : <EventPage event={event} location={location} />
        }
      </div>
    );
  }
}

Event.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  onUpdateHeaderTitle: React.PropTypes.func,
  onToggleEvent: React.PropTypes.func,
  schedule: React.PropTypes.object,
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
