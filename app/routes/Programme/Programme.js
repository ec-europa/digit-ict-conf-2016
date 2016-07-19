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
import { updateHeaderTitle, openModal } from '../../store/modules/layout';

// Components
import EventsList from '../../components/Events/List';
import Link from '../../components/Link/Link';

// Content
import events from '../../../content/events.json';

// Styles
import styles from './Programme.scss';


class Programme extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Programme');
  }

  render() {
    const { schedule, onToggleEvent, location } = this.props;

    return (
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
    );
  }
}

Programme.propTypes = {
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  onOpenModal: React.PropTypes.func,
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
    onOpenModal: () => {
      dispatch(openModal());
    },
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programme);
