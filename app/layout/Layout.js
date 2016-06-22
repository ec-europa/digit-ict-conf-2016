/**
 *
 * Layout
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { toggleDrawer, handleScroll } from '../store/modules/layout';

import { Header, HeaderToggle, HeaderLogos, HeaderNavigation, HeaderNavigationItem } from '../components/Header';
import { Drawer, DrawerHeader, DrawerHeaderLogos, DrawerHeaderTitle, DrawerNavigation, DrawerNavigationItem, DrawerNavigationSeparator } from '../components/Drawer';
import Footer from '../components/Footer/Footer';
import Content from '../components/Content/Content';

import europaLogo from './images/europa.png';
import ictLogo from './images/digitec.png';
import styles from './Layout.scss';

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener(event) {
    const { onScroll } = this.props;
    return onScroll(event);
  }

  render() {
    const { children, location, drawerOpen, headerPinned, headerUnpinned, onToggleDrawer } = this.props;

    return (
      <div className={styles.container}>
        <Header pinned={headerPinned} unpinned={headerUnpinned}>
          <HeaderToggle onClick={onToggleDrawer} />
          <HeaderLogos>
            <img srcSet={europaLogo} alt="DIGITEC 2016" />
            <img srcSet={ictLogo} alt="DIGITEC 2016" />
          </HeaderLogos>
          <HeaderNavigation>
            <HeaderNavigationItem to={'/speakers'} desktopOnly>Speakers</HeaderNavigationItem>
            <HeaderNavigationItem to={'/programme'} desktopOnly>Programme</HeaderNavigationItem>
            <HeaderNavigationItem to={'/'} desktopOnly>Expo</HeaderNavigationItem>
            <HeaderNavigationItem to={'/'} desktopOnly>Practical</HeaderNavigationItem>
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
            <DrawerNavigationItem to={'/'}>Expo</DrawerNavigationItem>
            <DrawerNavigationItem to={'/'}>Practical</DrawerNavigationItem>
            <DrawerNavigationItem to={'/'}>Previous editions</DrawerNavigationItem>
            <DrawerNavigationSeparator />
            <DrawerNavigationItem to={'/'}>Register</DrawerNavigationItem>
            <DrawerNavigationItem to={'/'}>#digitec16</DrawerNavigationItem>
          </DrawerNavigation>
        </Drawer>
        <Content>
          <ReactCSSTransitionGroup
            transitionName={{
              enter: styles.enter,
              enterActive: styles.enterActive,
              leave: styles.leave,
              leaveActive: styles.leaveActive,
            }}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={100}
          >
            {React.cloneElement(children, {
              key: location.pathname,
            })}
          </ReactCSSTransitionGroup>
        </Content>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  drawerOpen: React.PropTypes.bool,
  headerPinned: React.PropTypes.bool,
  headerUnpinned: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  onScroll: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.layout.drawerIsOpen,
    headerPinned: state.layout.headerPinned,
    headerUnpinned: state.layout.headerUnpinned,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleDrawer: () => {
      dispatch(toggleDrawer());
    },
    onScroll: () => {
      dispatch(handleScroll());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
