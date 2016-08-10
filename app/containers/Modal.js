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
    const { router, dispatch, modal } = this.props;

    // Return to the previous address
    if (modal.open) {
      router.push(modal.returnTo);
    }

    // Tell Redux that we close the modal
    dispatch(closeModal());
  }

  render() {
    const { modal } = this.props;
    return (
      <Layer isOpen={modal.open} onRequestClose={this.close}>
        {modal.open ?
          <Dialog onRequestClose={this.close} {...modal}>{modal.content}</Dialog>
          : null
        }
      </Layer>
    );
  }
}

ModalContainer.propTypes = {
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  modal: React.PropTypes.object,
};

export default connect(state => ({
  modal: state.ui.modal,
}))(withRouter(ModalContainer));
