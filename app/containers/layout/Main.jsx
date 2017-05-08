/**
 * MainContainer
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MainComponent from '../../ui/components/App/Main';
import styles from '../../ui/components/App/App.scss';

class MainContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isModal !== this.props.isModal ||
      nextProps.drawerOpen !== this.props.drawerOpen ||
      nextProps.contentKey !== this.props.contentKey
    );
  }

  componentWillUpdate(nextProps) {
    const { drawerOpen, isModal } = nextProps;

    if (drawerOpen) {
      document.body.classList.add(styles.drawerOpen);
    } else {
      document.body.classList.remove(styles.drawerOpen);
    }

    if (isModal) {
      document.body.classList.add(styles.modalOpen);
    } else {
      document.body.classList.remove(styles.modalOpen);
    }
  }

  render() {
    const { isModal, drawerOpen, children } = this.props;

    return (
      <MainComponent drawerOpen={drawerOpen} modalOpen={isModal}>
        {children}
      </MainComponent>
    );
  }
}

MainContainer.propTypes = {
  children: PropTypes.node,
  isModal: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  contentKey: PropTypes.string.isRequired,
};

MainContainer.defaultProps = {
  children: null,
  isModal: false,
  drawerOpen: false,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.ui.drawer.isOpen,
  };
}

export default connect(mapStateToProps)(MainContainer);
