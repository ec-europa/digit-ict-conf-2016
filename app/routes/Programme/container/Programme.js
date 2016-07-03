/*
 *
 * Programme
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import { toggleEvent, selectAllEvents, selectMyEvents } from '../../../store/modules/events';
import { updateHeaderTitle, openModal } from '../../../store/modules/layout';
import EventsList from '../../../components/Events/List';
import modalStyles from '../../../components/Modal/Modal.scss';

import styles from './Programme.scss';


class Programme extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Programme');
  }

  render() {
    const { events, onToggleEvent, children, location } = this.props;

    const content = (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: modalStyles.enter,
          enterActive: modalStyles.enterActive,
          appear: modalStyles.enter,
          appearActive: modalStyles.enterActive,
          leave: modalStyles.leave,
          leaveActive: modalStyles.leaveActive,
        }}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppear
        transitionAppearTimeout={300}
      >
        {children ? React.cloneElement(children, { key: location.pathname }) : null}
      </ReactCSSTransitionGroup>
    );

    return (
      <div className={styles.container}>
        <Helmet title="Programme" />
        <div className={styles.header}>
          <h1>Programme</h1>
        </div>
        <EventsList events={events} onToggle={onToggleEvent} />
        {content}
      </div>
    );
  }
}

Programme.propTypes = {
  events: React.PropTypes.array,
  myEvents: React.PropTypes.array,
  onToggleEvent: React.PropTypes.func,
  onOpenModal: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

Programme.defaultProps = {
  events: [],
  myEvents: [],
};

function mapStateToProps(state) {
  return {
    events: selectAllEvents(state),
    myEvents: selectMyEvents(state),
    modalOpen: state.layout.modalOpen,
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Programme);