/**
 * Root
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Redux actions
import { toggleDrawer } from '../store/modules/ui/drawer';

import styles from '../components/App/App.scss';

// Components
import App from '../components/App/App';
import Main from '../components/App/Main';
import Navigation from '../components/App/Navigation';
import Footer from '../components/App/Footer/Footer';
import Content from '../components/App/Content/Content';
import ModalContainer from '../containers/Modal';
import SnackbarContainer from '../containers/Snackbar';

class Root extends React.Component {
  constructor(props) {
    super(props);

    // Init location state
    props.location.state = { // eslint-disable-line
      modal: false,
    };

    this.state = {
      previousChildren: null,
      previousLocation: '',
      isModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if (nextProps.location.key !== this.props.location.key) {
      if (nextProps.location.state && nextProps.location.state.modal) {
        // save the old children (just like animation)
        if (!this.state.isModal) {
          this.setState({
            previousChildren: this.props.children,
            previousLocation: this.props.location.pathname,
            isModal: true,
          });
        }
      } else {
        this.setState({
          previousChildren: null,
          previousLocation: '',
          isModal: false,
        });
      }
    }
  }

  componentWillUpdate({ drawerOpen }, { isModal }) {
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
    const { children, location, drawerOpen, onToggleDrawer, headerTitle } = this.props;
    const { isModal, previousChildren, previousLocation } = this.state;

    const mainChildren = isModal ? previousChildren : children;
    const modalChildren = isModal ? children : null;
    const childrenKey = isModal ? previousLocation : location.pathname;

    return (
      <App>
        <Helmet titleTemplate="DIGITEC 2016 - %s" />
        <Main drawerOpen={drawerOpen} modalOpen={isModal}>
          <Navigation drawerOpen={drawerOpen} onToggleDrawer={onToggleDrawer} title={headerTitle} />
          <Content contentKey={childrenKey}>
            {mainChildren}
          </Content>
          <Footer />
        </Main>
        <ModalContainer isOpen={isModal} returnTo={previousLocation} pathname={location.pathname}>
          {modalChildren}
        </ModalContainer>
        <SnackbarContainer />
      </App>
    );
  }
}

Root.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  drawerOpen: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  headerTitle: React.PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);
