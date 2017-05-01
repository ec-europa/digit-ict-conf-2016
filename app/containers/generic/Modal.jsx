/**
* ModalContainer
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component
import Layer from '../../ui/components/Modal/Layer';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.close = this.close.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children;
  }

  close() {
    const { history, returnTo, isOpen } = this.props;
    if (isOpen) {
      history.push(returnTo);
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
  children: PropTypes.node,
  pathname: PropTypes.string,
  isOpen: PropTypes.bool,
  history: PropTypes.object.isRequired,
  returnTo: PropTypes.string,
};

ModalContainer.defaultProps = {
  children: null,
  pathname: '',
  isOpen: false,
  returnTo: '',
};

export default withRouter(ModalContainer);
