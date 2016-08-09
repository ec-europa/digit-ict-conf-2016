/**
* ModalContainer
*/

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Components
import Layer from '../components/Modal/Layer';
import Dialog from '../components/Modal/Dialog';

// Redux actions
import { closeModal } from '../store/modules/ui/modal';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.close = this.close.bind(this);
  }

  close() {
    const { router, returnTo, dispatch, modal } = this.props;

    // Return to the previous address
    if (modal.open) {
      router.push(returnTo);
    }

    // Tell Redux that we close the modal
    dispatch(closeModal());
  }

  render() {
    const { children, pathname, modal } = this.props;
    return (
      <Layer pathname={pathname} isOpen={modal.open} onRequestClose={this.close}>
        <Dialog onRequestClose={this.close} {...modal}>{children}</Dialog>
      </Layer>
    );
  }
}

ModalContainer.propTypes = {
  children: React.PropTypes.node,
  pathname: React.PropTypes.string,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  returnTo: React.PropTypes.string,
  modal: React.PropTypes.object,
};

export default connect(state => ({
  modal: state.ui.modal,
}))(withRouter(ModalContainer));
