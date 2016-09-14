/**
 * Snackbar
 */

import React from 'react';
import { connect } from 'react-redux';

// Redux actions
import { closeSnackbar } from '../../store/modules/ui/snackbar';

// Component
import SnackbarLayer from '../../ui/components/Snackbar/Layer';

class SnackbarContainer extends React.Component {
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
  snackbar: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(state => ({
  snackbar: state.ui.snackbar,
}))(SnackbarContainer);
