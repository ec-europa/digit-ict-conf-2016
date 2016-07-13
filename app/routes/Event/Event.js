/*
 *
 * Event
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

// Content
import events from '../../../content/events.json';

// Components
import EventModal from '../../components/Events/Modal';
import EventPage from '../../components/Events/Page';

export class Event extends React.Component {
  constructor(props) {
    super(props);

    const { eventId } = props.params;

    this.state = {
      event: events.filter(event => event.id === eventId)[0],
    };

    // Force "returnTo" when accessing the page direclty
    if (props.location.action === 'POP') {
      if (props.location.state) {
        props.location.state.returnTo = props.location.pathname; // eslint-disable-line
      } else {
        props.location.state = { // eslint-disable-line
          returnTo: props.location.pathname,
        };
      }
    }
  }

  render() {
    const { event } = this.state;
    const { location } = this.props;

    return (
      <div>
        <Helmet title={event.title} />
        {location.state && location.state.modal && location.action === 'PUSH'
          ? <EventModal event={event} location={location} />
          : <EventPage event={event} location={location} />
        }
      </div>
    );
  }
}

Event.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default withRouter(Event);
