/**
 * Root
 */

import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../ui/components/App/App.scss';

import {
  Event,
  Gallery,
  Home,
  MyDigitec,
  NotFound,
  Practical,
  Programme,
  Speaker,
  Speakers,
  Stand,
  Expo,
} from './views';

import Main from '../ui/components/App/Main';
import Navigation from '../ui/components/App/Navigation';
import Footer from '../ui/components/App/Footer/Footer';
import Content from '../ui/components/App/Content/Content';
import ModalContainer from './generic/Modal';
import SnackbarContainer from './generic/Snackbar';

// Redux actions
import { toggleDrawer } from '../store/modules/ui/drawer';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    // Init location state
    // eslint-disable-next-line
    props.location.state = {
      modal: false,
    };

    this.previousLocation = props.location;

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;

    // Set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  componentWillUpdate(nextProps) {
    const { drawerOpen, location } = nextProps;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );

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

  closeModal() {
    const { history, location } = this.props;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );

    const returnTo = this.previousLocation.pathname;

    if (isModal) {
      history.push(returnTo);
    }
  }

  render() {
    const { location, drawerOpen, onToggleDrawer, headerTitle } = this.props;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );

    const childrenKey = isModal ? this.previousLocation.pathname : location.pathname;

    return (
      <div>
        <Helmet titleTemplate="DIGITEC 2016 - %s" />
        <Main drawerOpen={drawerOpen} modalOpen={isModal}>
          <Navigation
            isModal={isModal}
            drawerOpen={drawerOpen}
            onToggleDrawer={onToggleDrawer}
            title={headerTitle}
          />
          <Content contentKey={childrenKey}>
            <Switch location={isModal ? this.previousLocation : location}>
              <Route exact path="/" component={Home} />
              <Route path="/speakers" component={Speakers} />
              <Route path="/speaker/:speakerId" component={Speaker} />
              <Route path="/programme" component={Programme} />
              <Route path="/my-digitec" component={MyDigitec} />
              <Route path="/event/:eventId" component={Event} />
              <Route path="/expo" component={Expo} />
              <Route path="/stand/:standId" component={Stand} />
              <Route path="/practical" component={Practical} />
              <Route path="/gallery" component={Gallery} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer />
        </Main>
        <ModalContainer
          isOpen={isModal}
          returnTo={this.previousLocation.pathname}
          pathname={location.pathname}
          onRequestClose={this.closeModal}
        >
          {isModal ?
            <Switch>
              <Route
                path="/speaker/:speakerId"
                render={props => (
                  <Speaker onRequestClose={this.closeModal} isModal {...props} />
                )}
              />
              <Route
                path="/event/:eventId"
                render={props => (
                  <Event onRequestClose={this.closeModal} isModal {...props} />
                )}
              />
              <Route
                path="/stand/:standId"
                render={props => (
                  <Stand onRequestClose={this.closeModal} isModal {...props} />
                )}
              />
            </Switch>
          : null}
        </ModalContainer>
        <SnackbarContainer />
      </div>
    );
  }
}

Root.propTypes = {
  location: PropTypes.object,
  drawerOpen: PropTypes.bool,
  onToggleDrawer: PropTypes.func,
  headerTitle: PropTypes.string,
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
