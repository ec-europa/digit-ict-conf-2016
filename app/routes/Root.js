/**
 * Root
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Redux actions
import { toggleDrawer } from '../store/modules/ui/drawer';

// Components
import App from '../components/App/App';
import Main from '../components/App/Main';
import { Header, HeaderToggle, HeaderTitle, HeaderLogos, HeaderNavigation, HeaderNavigationItem } from '../components/App/Header';
import { Drawer, DrawerHeader, DrawerHeaderLogos, DrawerHeaderTitle, DrawerNavigation, DrawerNavigationItem, DrawerNavigationSeparator } from '../components/App/Drawer';
import Footer from '../components/App/Footer/Footer';
import Content from '../components/App/Content/Content';
import ModalContainer from '../containers/Modal';
import SnackbarContainer from '../containers/Snackbar';

class Root extends React.Component {
  constructor(props) {
    super(props);
    document.body.style.overflow = 'auto';

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
    if (drawerOpen || isModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
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
          <Header>
            <HeaderToggle onClick={onToggleDrawer} />
            <HeaderLogos />
            <HeaderTitle title={headerTitle} />
            <HeaderNavigation>
              <HeaderNavigationItem to={'/speakers'}>Speakers</HeaderNavigationItem>
              <HeaderNavigationItem to={'/programme'}>Programme</HeaderNavigationItem>
              <HeaderNavigationItem to={'/my-digitec'}>My DIGITEC</HeaderNavigationItem>
              <HeaderNavigationItem to={'/practical'}>Practical</HeaderNavigationItem>
              <HeaderNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start'} target="_blank" rel="noopener noreferrer" primary>Register</HeaderNavigationItem>
            </HeaderNavigation>
          </Header>
          <Content contentKey={childrenKey}>
            {mainChildren}
          </Content>
          <Footer />
        </Main>
        <Drawer onToggle={onToggleDrawer} isOpen={drawerOpen}>
          <DrawerHeader>
            <DrawerHeaderLogos />
            <DrawerHeaderTitle>29 November, 2016</DrawerHeaderTitle>
            <DrawerHeaderTitle>Square Brussels</DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerNavigation>
            <DrawerNavigationItem to={'/'}>Home</DrawerNavigationItem>
            <DrawerNavigationItem to={'/speakers'}>Speakers</DrawerNavigationItem>
            <DrawerNavigationItem to={'/programme'}>Programme</DrawerNavigationItem>
            <DrawerNavigationItem to={'/my-digitec'}>My DIGITEC</DrawerNavigationItem>
            <DrawerNavigationItem to={'/practical'}>Practical</DrawerNavigationItem>
            <DrawerNavigationSeparator />
            <DrawerNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start'} target="_blank" rel="noopener noreferrer">Register</DrawerNavigationItem>
            <DrawerNavigationItem to={'https://twitter.com/hashtag/digitec16'} target="_blank" rel="noopener noreferrer">#digitec16</DrawerNavigationItem>
          </DrawerNavigation>
        </Drawer>
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
