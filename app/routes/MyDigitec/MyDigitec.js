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

// Load components
import EventsList from '../../components/Events/List';
import Link from '../../components/Link/Link';

// Load content
import events from '../../../content/events.json';

// Load styles
import styles from './MyDigitec.scss';

class MyDigitec extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('My DIGITEC');
  }

  render() {
    const { schedule, onToggleEvent, location } = this.props;
    const myEvents = events.filter(event => schedule[event.id] || event.register === false);

    return (
      <div className={styles.container}>
        <Helmet title="Programme" />
        <div className={styles.header}>
          <h1>My DIGITEC</h1>
        </div>
        <div className={styles.intro}>
          <p>
            "My DIGITEC" helps you personalise your experience. Select your favourite sessions from <Link to={'/programme'}>DIGITEC programme</Link>.
          </p>
          <p>
            You can <Link to={{ pathname: 'import', state: { modal: true } }}>import</Link> or <Link to={{ pathname: 'export', state: { modal: true } }}>export</Link> your DIGITEC and share your schedule between different devices: desktop, mobile, etc.
          </p>
        </div>
        {myEvents.length > 0 && (
          <EventsList events={myEvents} schedule={schedule} onToggle={onToggleEvent} location={location} />
        )}
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
