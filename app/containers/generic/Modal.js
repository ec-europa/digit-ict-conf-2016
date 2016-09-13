/**
* ModalContainer
*/

import React from 'react';
import { withRouter } from 'react-router';

// Component
import Layer from '../../ui/components/Modal/Layer';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.close = this.close.bind(this);
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
      <Layer pathname={pathname} isOpen={isOpen} onRequestClose={this.close}>{children}</Layer>
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
