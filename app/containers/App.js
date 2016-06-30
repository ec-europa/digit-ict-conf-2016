/**
 *
 * App
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import { toggleDrawer, handleScroll } from '../store/modules/layout';

import { Header, HeaderToggle, HeaderTitle, HeaderLogos, HeaderNavigation, HeaderNavigationItem } from '../components/Header';
import { Drawer, DrawerHeader, DrawerHeaderLogos, DrawerHeaderTitle, DrawerNavigation, DrawerNavigationItem, DrawerNavigationSeparator } from '../components/Drawer';
import Footer from '../components/Footer/Footer';
import Content from '../components/Content/Content';

import styles from './App.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);
    document.body.style.overflow = 'auto';
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUpdate({ drawerOpen, modalOpen }) {
    if (drawerOpen || modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener(event) {
    const { onScroll } = this.props;
    return onScroll(event);
  }

  render() {
    const {
      children,
      location,
      drawerOpen,
      headerPinned,
      headerUnpinned,
      onToggleDrawer,
      modalOpen,
      headerTitle,
    } = this.props;

    let childrenKey;
    if (location.pathname.startsWith('/speakers')) {
      childrenKey = '/speakers';
    } else if (location.pathname.startsWith('/programme')) {
      childrenKey = '/programme';
    } else {
      childrenKey = location.pathname;
    }

    const containerClasses = classnames(
      styles.container,
      { [`${styles.containerNoOverflow}`]: modalOpen }
    );

    return (
      <div className={containerClasses}>
        <Helmet
          base={{ href: process.env.BASE_URL }}
          titleTemplate="DIGIT ICT 2016 - %s"
        />
        <Header pinned={headerPinned} unpinned={headerUnpinned}>
          <HeaderToggle onClick={onToggleDrawer} />
          <HeaderLogos />
          <HeaderTitle title={headerTitle} />
          <HeaderNavigation>
            <HeaderNavigationItem to={'/speakers'} desktopOnly>Speakers</HeaderNavigationItem>
            <HeaderNavigationItem to={'/programme'} desktopOnly>Programme</HeaderNavigationItem>
            <HeaderNavigationItem to={'/my-digitec'} desktopOnly>My DIGITEC</HeaderNavigationItem>
            <HeaderNavigationItem to={'/practical'} desktopOnly>Practical</HeaderNavigationItem>
            <HeaderNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGIT-ICT-2016'} target="_blank" register>Register</HeaderNavigationItem>
          </HeaderNavigation>
        </Header>
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
            <DrawerNavigationItem to={'https://twitter.com/hashtag/digitec16'} target="_blank">#digitec16</DrawerNavigationItem>
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
            transitionEnterTimeout={600}
            transitionLeaveTimeout={300}
          >
            {React.cloneElement(children, {
              key: childrenKey,
            })}
          </ReactCSSTransitionGroup>
        </Content>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  drawerOpen: React.PropTypes.bool,
  headerPinned: React.PropTypes.bool,
  headerUnpinned: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  onScroll: React.PropTypes.func,
  modalOpen: React.PropTypes.bool,
  headerTitle: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.layout.drawerIsOpen,
    headerPinned: state.layout.headerPinned,
    headerUnpinned: state.layout.headerUnpinned,
    modalOpen: state.layout.modalOpen,
    headerTitle: state.layout.headerTitle,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
