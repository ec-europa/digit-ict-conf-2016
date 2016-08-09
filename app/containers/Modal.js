/**
* ModalContainer
*/

import React from 'react';
import { withRouter } from 'react-router';

// Component
import Modal from '../components/Modal/Modal';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      document.addEventListener('keydown', this.handleKeyDown);
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    // ESC
    if (event.keyCode === 27) {
      event.preventDefault();
      this.close();
    }
  }

  close() {
    const { router, returnTo, isOpen } = this.props;
    if (isOpen) {
      router.push(returnTo);
    }
  }

  render() {
    const { children, pathname, isOpen } = this.props;
    return (
      <Modal pathname={pathname} isOpen={isOpen} close={this.close}>
        {children}
      </Modal>
    );
  }
}

ModalContainer.propTypes = {
  children: React.PropTypes.node,
  pathname: React.PropTypes.string,
  isOpen: React.PropTypes.bool,
  router: React.PropTypes.object,
  returnTo: React.PropTypes.string,
};

export default withRouter(ModalContainer);
