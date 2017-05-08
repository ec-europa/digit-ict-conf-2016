/**
* ModalContainer
*/

import React from 'react';
import PropTypes from 'prop-types';

// Component
import Layer from '../../ui/components/Modal/Layer';

// eslint-disable-next-line
class ModalContainer extends React.PureComponent {
  render() {
    const { children, pathname, isOpen, onRequestClose } = this.props;
    return (
      <Layer
        pathname={pathname}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      >
        {children}
      </Layer>
    );
  }
}

ModalContainer.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
};

ModalContainer.defaultProps = {
  children: null,
  pathname: '',
  isOpen: false,
};

export default ModalContainer;
