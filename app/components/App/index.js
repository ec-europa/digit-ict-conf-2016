/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';

import { toggleDrawer } from '../../store/modules/drawer';

import { Header, HeaderToggle, HeaderLogos, HeaderNavigation, HeaderNavigationItem } from './components/Header';
import { Drawer, DrawerHeader, DrawerHeaderLogos, DrawerHeaderTitle, DrawerNavigation, DrawerNavigationItem, DrawerNavigationSeparator } from './components/Drawer';
import Footer from './components/Footer';
import Content from './components/Content';

import europaLogo from './images/europa.png';
import ictLogo from './images/digitec.png';

function App({ children, drawerOpen, onToggleDrawer }) {
  return (
    <div>
      <Header>
        <HeaderToggle onClick={onToggleDrawer} />
        <HeaderLogos>
          <img srcSet={europaLogo} alt="DIGITEC 2016" />
          <img srcSet={ictLogo} alt="DIGITEC 2016" />
        </HeaderLogos>
        <HeaderNavigation>
          <HeaderNavigationItem to={'/speakers'} desktopOnly>Speakers</HeaderNavigationItem>
          <HeaderNavigationItem to={'/programme'} desktopOnly>Programme</HeaderNavigationItem>
          <HeaderNavigationItem to={'/'}>Register</HeaderNavigationItem>
        </HeaderNavigation>
      </Header>
      <Drawer onToggle={onToggleDrawer} isOpen={drawerOpen}>
        <DrawerHeader>
          <DrawerHeaderLogos>
            <img srcSet={europaLogo} alt="DIGITEC 2016" />
            <img srcSet={ictLogo} alt="DIGITEC 2016" />
          </DrawerHeaderLogos>
          <DrawerHeaderTitle>29/11/16 BRUSSELS</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerNavigation>
          <DrawerNavigationItem to={'/'}>Home</DrawerNavigationItem>
          <DrawerNavigationItem to={'/speakers'}>Speakers</DrawerNavigationItem>
          <DrawerNavigationItem to={'/programme'}>Programme</DrawerNavigationItem>
          <DrawerNavigationItem to={'/programme'}>Expo</DrawerNavigationItem>
          <DrawerNavigationItem to={'/programme'}>Practical</DrawerNavigationItem>
          <DrawerNavigationItem to={'/programme'}>Previous editions</DrawerNavigationItem>
          <DrawerNavigationSeparator />
          <DrawerNavigationItem to={'/'}>Register</DrawerNavigationItem>
          <DrawerNavigationItem to={'/'}>#digitec16</DrawerNavigationItem>
        </DrawerNavigation>
      </Drawer>
      <Content>
        {children}
      </Content>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
  drawerOpen: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.drawer.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleDrawer: () => {
      dispatch(toggleDrawer());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
