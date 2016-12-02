/*
 *
 * Programme
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Redux actions
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Content
import events from '../../../content/events.json';

// Styles
import View from '../../ui/views/Programme';

class Programme extends React.PureComponent {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Programme');
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    const { schedule, onToggleEvent, location } = this.props;

    return (
      <div>
        <Helmet title="Programme" />
        <View schedule={schedule} onToggleEvent={onToggleEvent} location={location} events={events} />
      </div>
    );
  }
}

Programme.propTypes = {
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
  location: React.PropTypes.object,
};

Programme.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Programme);
