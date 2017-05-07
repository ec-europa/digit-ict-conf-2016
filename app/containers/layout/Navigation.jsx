/**
 * NavigationContainer
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationComponent from '../../ui/components/App/Navigation';

// Redux actions
import { toggleDrawer } from '../../store/modules/ui/drawer';

class NavigationContainer extends React.PureComponent {
  render() {
    const { isModal, drawerOpen, onToggleDrawer, headerTitle } = this.props;

    return (
      <NavigationComponent
        isModal={isModal}
        drawerOpen={drawerOpen}
        onToggleDrawer={onToggleDrawer}
        title={headerTitle}
      />
    );
  }
}

NavigationContainer.propTypes = {
  isModal: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  onToggleDrawer: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
};

NavigationContainer.defaultProps = {
  isModal: false,
  drawerOpen: false,
  headerTitle: '',
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.ui.drawer.isOpen,
    headerTitle: state.ui.header.title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleDrawer: () => {
      dispatch(toggleDrawer());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NavigationContainer
);
