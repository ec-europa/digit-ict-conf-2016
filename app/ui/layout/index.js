/**
 * Layout
 */

import React from 'react';

// Import the CSS resets and base theme
import '../theme/base.scss';

import styles from '../components/App/App.scss';

// Components
import App from '../components/App/App';
import Main from '../components/App/Main';
import Navigation from '../components/App/Navigation';
import Footer from '../components/App/Footer/Footer';
import Content from '../components/App/Content/Content';
import ModalContainer from '../../containers/generic/Modal';
import SnackbarContainer from '../../containers/generic/Snackbar';

class Layout extends React.PureComponent {
  componentWillUpdate({ drawerOpen, isModal }) {
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
    const {
      children,
      location,
      drawerOpen,
      onToggleDrawer,
      headerTitle,
      isModal,
      previousChildren,
      previousLocation,
    } = this.props;

    const mainChildren = isModal ? previousChildren : children;
    const modalChildren = isModal ? children : null;
    const childrenKey = isModal ? previousLocation : location.pathname;

    return (
      <App>
        <Main drawerOpen={drawerOpen} modalOpen={isModal}>
          <Navigation isModal={isModal} drawerOpen={drawerOpen} onToggleDrawer={onToggleDrawer} title={headerTitle} />
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

Layout.propTypes = {
  children: React.PropTypes.node,
  previousChildren: React.PropTypes.node,
  location: React.PropTypes.object,
  previousLocation: React.PropTypes.string,
  drawerOpen: React.PropTypes.bool,
  isModal: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  headerTitle: React.PropTypes.string,
};


export default Layout;
