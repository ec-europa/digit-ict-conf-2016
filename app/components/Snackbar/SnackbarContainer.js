/**
 *
 * Snackbar
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Redux actions
import { closeSnackbar } from '../../actions/ui/snackbar';

// Component
import Snackbar from './Snackbar';

import styles from './SnackbarContainer.scss';

const SnackbarContainer = ({ snackbar, dispatch }) => {
  const isVisible = snackbar && snackbar.message;
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
        <Snackbar
          onRequestClose={() => dispatch(closeSnackbar())}
          className={styles.snackbar}
          key={snackbar.id}
          {...snackbar}
        />
        : null
      }
    </ReactCSSTransitionGroup>
  );
};

SnackbarContainer.propTypes = {
  snackbar: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(state => ({
  snackbar: state.ui.snackbar,
}))(SnackbarContainer);
