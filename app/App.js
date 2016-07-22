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

// Redux actions
import { toggleDrawer } from './store/modules/layout';

// Components
import { Header, HeaderToggle, HeaderTitle, HeaderLogos, HeaderNavigation, HeaderNavigationItem } from './components/App/Header';
import { Drawer, DrawerHeader, DrawerHeaderLogos, DrawerHeaderTitle, DrawerNavigation, DrawerNavigationItem, DrawerNavigationSeparator } from './components/App/Drawer';
import Footer from './components/App/Footer/Footer';
import Content from './components/App/Content/Content';
import Modal from './components/Modal/Modal';

// Styles
import styles from './App.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);
    document.body.style.overflow = 'auto';

    // Init location state
    props.location.state = { // eslint-disable-line
      returnTo: '/',
      modal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if (nextProps.location.key !== this.props.location.key) {
      if (nextProps.location.state && nextProps.location.state.modal) {
        // save the old children (just like animation)
        if (!this.wasModal) {
          this.previousChildren = this.props.children;
        }
        this.wasModal = true;
      } else {
        this.wasModal = false;
      }
    }
  }

  componentWillUpdate({ drawerOpen, location }) {
    const isModal = !!(location.state && location.state.modal && this.previousChildren);

    if (drawerOpen || isModal) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('aria-hidden', 'true');
    } else {
      document.body.style.overflow = 'auto';
      document.body.setAttribute('aria-hidden', 'false');
    }
  }

  render() {
    const {
      children,
      location,
      drawerOpen,
      onToggleDrawer,
      headerTitle,
    } = this.props;

    const isModal = !!(location.state && location.state.modal && this.previousChildren);

    const mainChildren = isModal ?
      this.previousChildren :
      children;
    const modalChildren = isModal ? children : null;
    const childrenKey = isModal ? location.state.returnTo : location.pathname;

    const containerClasses = classnames(
      styles.container,
      { [`${styles.containerNoOverflow}`]: isModal }
    );

    return (
      <div className={containerClasses}>
        <Helmet titleTemplate="DIGITEC 2016 - %s" />
        <Header>
          <HeaderToggle onClick={onToggleDrawer} />
          <HeaderLogos />
          <HeaderTitle title={headerTitle} />
          <HeaderNavigation>
            <HeaderNavigationItem to={'/speakers'}>Speakers</HeaderNavigationItem>
            <HeaderNavigationItem to={'/programme'}>Programme</HeaderNavigationItem>
            <HeaderNavigationItem to={'/my-digitec'}>My DIGITEC</HeaderNavigationItem>
            <HeaderNavigationItem to={'/practical'}>Practical</HeaderNavigationItem>
            <HeaderNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start'} target="_blank" primary>Register</HeaderNavigationItem>
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
            <DrawerNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start'} target="_blank">Register</DrawerNavigationItem>
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
            transitionEnterTimeout={300}
            transitionLeaveTimeout={10}
          >
            {React.cloneElement(mainChildren, {
              key: childrenKey,
            })}
          </ReactCSSTransitionGroup>
        </Content>
        <Footer />
        <Modal isOpen={isModal} returnTo={location.state ? location.state.returnTo : ''} pathname={location.pathname}>
          {modalChildren}
        </Modal>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  drawerOpen: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  headerTitle: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.layout.drawerIsOpen,
    headerTitle: state.layout.headerTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleDrawer: () => {
      dispatch(toggleDrawer());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);