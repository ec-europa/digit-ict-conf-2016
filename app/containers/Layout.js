/**
 *
 * LayoutContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import classnames from 'classnames';

// Redux actions
import { toggleDrawer } from '../store/modules/ui/drawer';
import { openModal } from '../store/modules/ui/modal';

// Components
import { Header, HeaderToggle, HeaderLogos, HeaderNavigation, HeaderNavigationItem } from '../components/Layout/Header';
import { Drawer, DrawerHeader, DrawerHeaderLogos, DrawerHeaderTitle, DrawerNavigation, DrawerNavigationItem, DrawerNavigationSeparator } from '../components/Layout/Drawer';
import Footer from '../components/Layout/Footer/Footer';
import Content from '../components/Layout/Content/Content';

import HeaderTitleContainer from './Layout/HeaderTitle';

// Styles
import styles from '../Root.scss';

class LayoutContainer extends React.Component {
  constructor(props) {
    super(props);
    document.body.style.overflow = 'auto';

    // Init location state
    props.location.state = { // eslint-disable-line
      returnTo: props.location.pathname,
      modal: false,
    };

    this.state = {
      previousChildren: null,
      previousPathname: '',
      isModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // If we changed routes
    if (nextProps.location.key !== this.props.location.key) {
      if (nextProps.location.state && nextProps.location.state.modal) {
        if (!this.props.location.state || !this.props.location.state.modal) {
          this.props.dispatch(openModal({
            returnTo: this.props.location.pathname,
          }));
          // Save the old children
          this.setState({
            previousChildren: this.props.children,
            previousPathname: this.props.location.pathname,
            isModal: true,
          });
        }
      } else {
        this.setState({
          previousChildren: null,
          previousPathname: '',
          isModal: false,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUpdate({ drawerOpen, modalOpen }) {
    if (drawerOpen || modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  render() {
    const { children, location, drawerOpen, onToggleDrawer, content } = this.props;
    const { isModal, previousPathname, previousChildren } = this.state;
    const childrenKey = isModal ? previousPathname : location.pathname;

    const containerClasses = classnames(
      styles.container,
      { [`${styles.containerNoOverflow}`]: isModal }
    );

    return (
      <div aria-hidden={drawerOpen || isModal} className={containerClasses}>
        <Header>
          <HeaderToggle onClick={onToggleDrawer} />
          <HeaderLogos />
          <HeaderTitleContainer />
          <HeaderNavigation>
            <HeaderNavigationItem to={'/speakers'}>Speakers</HeaderNavigationItem>
            <HeaderNavigationItem to={'/programme'}>Programme</HeaderNavigationItem>
            <HeaderNavigationItem to={'/my-digitec'}>My DIGITEC</HeaderNavigationItem>
            <HeaderNavigationItem to={'/practical'}>Practical</HeaderNavigationItem>
            <HeaderNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start'} target="_blank" rel="noopener noreferrer" primary>Register</HeaderNavigationItem>
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
            <DrawerNavigationItem to={'https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start'} target="_blank" rel="noopener noreferrer">Register</DrawerNavigationItem>
            <DrawerNavigationItem to={'https://twitter.com/hashtag/digitec16'} target="_blank" rel="noopener noreferrer">#digitec16</DrawerNavigationItem>
          </DrawerNavigation>
        </Drawer>
        <Content contentKey={childrenKey}>
          {content}
          {previousChildren}
          {children}
        </Content>
        <Footer />
      </div>
    );
  }
}

LayoutContainer.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  drawerOpen: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  modalOpen: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.ui.drawer.isOpen,
    modalOpen: state.ui.modal.open,
    content: state.ui.content,
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

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
