/**
 *
 * NotificationCenter
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Redux actions
import { closeNotification } from '../store/modules/notification';

// Component
import Notification from '../components/Notification/Notification';

import styles from './NotificationCenter.scss';

const NotificationCenter = ({ notification, dispatch }) => {
  const isVisible = notification && notification.body;
  return (
    <ReactCSSTransitionGroup
      transitionName={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        leave: styles.leave,
        leaveActive: styles.leaveActive,
      }}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      component="div"
      aria-hidden={!isVisible}
    >
      {isVisible ?
        <Notification
          onRequestClose={() => dispatch(closeNotification())}
          className={styles.notification}
          key={notification.id}
          {...notification}
        />
        : null
      }
    </ReactCSSTransitionGroup>
  );
};

NotificationCenter.propTypes = {
  notification: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCenter);
