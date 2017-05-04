/**
 * Snackbar
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Redux actions
import { closeSnackbar } from '../../store/modules/ui/snackbar';

// Component
import SnackbarLayer from '../../ui/components/Snackbar/Layer';

class SnackbarContainer extends React.PureComponent {
  constructor(props) {
    super(props);

    // Bindings
    this.triggerAction = this.triggerAction.bind(this);
    this.requestClose = this.requestClose.bind(this);
  }

  requestClose() {
    const { dispatch } = this.props;
    return dispatch(closeSnackbar());
  }

  triggerAction(event) {
    const { snackbar } = this.props;
    event.stopPropagation();
    return snackbar.action.onClick();
  }

  render() {
    const { snackbar } = this.props;

    return (
      <SnackbarLayer
        onRequestClose={this.requestClose}
        onTriggerAction={this.triggerAction}
        {...snackbar}
      />
    );
  }
}

SnackbarContainer.propTypes = {
  snackbar: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

SnackbarContainer.defaultProps = {
  snackbar: {},
};

export default connect(state => ({
  snackbar: state.ui.snackbar,
}))(SnackbarContainer);
