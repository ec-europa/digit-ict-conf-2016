/*
 *
 * Container
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Load Redux actions
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Load content
import events from '../../../content/events.json';

import View from '../../ui/views/MyDigitec';

class MyDigitec extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('My DIGITEC');
  }

  render() {
    const { schedule, onToggleEvent, location } = this.props;
    const myEvents = events.filter(event => schedule[event.id] || event.register === false);

    return (
      <div>
        <Helmet title="Programme" />
        <View schedule={schedule} onToggleEvent={onToggleEvent} location={location} myEvents={myEvents} />
      </div>
    );
  }
}

MyDigitec.propTypes = {
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
  location: React.PropTypes.object,
};

MyDigitec.defaultProps = {
  schedule: [],
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

export default connect(mapStateToProps, mapDispatchToProps)(MyDigitec);
