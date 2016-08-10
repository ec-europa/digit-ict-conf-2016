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
import { setContent } from '../../store/modules/ui/content';

// Components
import EventsList from '../../components/Events/List';
import Link from '../../components/Link/Link';

// Content
import events from '../../../content/events.json';

// Styles
import styles from './Programme.scss';


class Programme extends React.Component {
  componentDidMount() {
    const { schedule, onToggleEvent, location, dispatch } = this.props;

    dispatch(updateHeaderTitle('Programme'));
    dispatch(setContent(
      <div className={styles.container}>
        <Helmet title="Programme" />
        <div className={styles.header}>
          <h1>Programme</h1>
        </div>
        <div className={styles.intro}>
          <p>
            Choose and save your favourite sessions to <Link to={'/my-digitec'}>My DIGITEC</Link>.
          </p>
        </div>
        <EventsList events={events} schedule={schedule} onToggle={onToggleEvent} location={location} />
      </div>
    ));
  }

  render() {
    return null;
  }
}

Programme.propTypes = {
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
  location: React.PropTypes.object,
  dispatch: React.PropTypes.func,
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programme);
