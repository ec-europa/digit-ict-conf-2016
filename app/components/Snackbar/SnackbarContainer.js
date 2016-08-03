/**
 * Snackbar
 */

import React from 'react';
import { connect } from 'react-redux';

// Redux actions
import { closeSnackbar } from '../../actions/ui/snackbar';

// Component
import Snackbar from './Snackbar';

class SnackbarContainer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.triggerAction = this.triggerAction.bind(this);
    this.requestClose = this.requestClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // Init timeout
    this.dismissTimeout = null;
  }

  componentDidUpdate() {
    clearTimeout(this.dismissTimeout);
    document.removeEventListener('keydown', this.handleKeyDown, true);

    if (this.props.snackbar.open) {
      this.dismissTimeout = setTimeout(this.requestClose, 5000);
      document.addEventListener('keydown', this.handleKeyDown, true);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimeout);
    document.removeEventListener('keydown', this.handleKeyDown, true);
  }

  handleKeyDown(event) {
    // ESC
    if (event.keyCode === 27) {
      event.stopImmediatePropagation();
      this.requestClose();
    }
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
      <Snackbar
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
