/*
 *
 * Container
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle, openModal } from '../../store/modules/layout';
import EventsList from '../../components/Events/List';
import modalStyles from '../../components/Modal/Modal.scss';
import events from '../../../content/events.json';
import styles from './Container.scss';

class Container extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('My DIGITEC');
  }

  render() {
    const { schedule, onToggleEvent, children, location } = this.props;
    const myEvents = events.filter(event => schedule[event.id]);
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
          <h1>My DIGITEC</h1>
        </div>
        {myEvents.length > 0
          ? <EventsList events={myEvents} schedule={schedule} onToggle={onToggleEvent} />
          : <div className={styles.intro}>
            <p>
              "My DIGITEC" helps you personalise your experience. Start adding events to your schedule.
            </p>
          </div>

        }
        {content}
      </div>
    );
  }
}

Container.propTypes = {
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  onOpenModal: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

Container.defaultProps = {
  schedule: [],
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
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

export default connect(mapStateToProps, mapDispatchToProps)(Container);
