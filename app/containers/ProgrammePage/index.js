/* global componentHandler */
/*
 *
 * ProgrammePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectAllEvents, selectMyEvents } from '../../store/selectors/events';
import { addEvent, removeEvent } from '../../store/actions/events';
import EventList from '../../components/Events/List';

import './styles.scss';

export class ProgrammePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeElement(this.refs.tabs);
  }

  toggle(event) {
    const checked = !event.attend;
    if (checked) {
      this.props.onAddEvent(event);
    } else {
      this.props.onRemoveEvent(event);
    }
  }

  render() {
    const { events, myEvents } = this.props;
    return (
      <div>
        <div className="programmePageHeader">
          <h1>Programme</h1>
        </div>
        <div className="mdl-grid ict-max-width-900">
          <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect" ref="tabs">
            <div className="mdl-tabs__tab-bar">
              <a href="#agenda" className="mdl-tabs__tab is-active">Agenda</a>
              <a href="#my-schedule" className="mdl-tabs__tab">My schedule</a>
            </div>
            <div className="mdl-tabs__panel is-active" id="agenda">
              <ul className="demo-list-control mdl-list">
                <EventList events={events} onToggle={this.toggle} />
              </ul>
            </div>
            <div className="mdl-tabs__panel" id="my-schedule">
              <ul className="demo-list-control mdl-list">
                <EventList events={myEvents} onToggle={this.toggle} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProgrammePage.propTypes = {
  events: React.PropTypes.array,
  myEvents: React.PropTypes.array,
  onAddEvent: React.PropTypes.func,
  onRemoveEvent: React.PropTypes.func,
};

ProgrammePage.defaultProps = {
  events: [],
  myEvents: [],
};

function mapStateToProps(state) {
  return {
    events: selectAllEvents(state),
    myEvents: selectMyEvents(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddEvent: (event) => {
      dispatch(addEvent(event));
    },
    onRemoveEvent: (event) => {
      dispatch(removeEvent(event));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgrammePage);
