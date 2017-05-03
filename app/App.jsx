/**
 * App
 */

import React from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import smoothScroll from 'smooth-scroll';

import styles from './ui/components/App/App.scss';

import {
  Event,
  Gallery,
  Home,
  MyDigitec,
  News,
  Newsletters,
  NotFound,
  Practical,
  Programme,
  Speaker,
  Speakers,
  Stand,
  Expo,
} from './containers/views';

import Main from './ui/components/App/Main';
import Navigation from './ui/components/App/Navigation';
import Footer from './ui/components/App/Footer/Footer';
import Content from './ui/components/App/Content/Content';
import ModalContainer from './containers/generic/Modal';
import SnackbarContainer from './containers/generic/Snackbar';

// Redux actions
import { closeDrawer, toggleDrawer } from './store/modules/ui/drawer';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

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

    const isModal = !!(location.state &&
      location.state.modal &&
      this.previousLocation !== location); // not initial render

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

  componentDidUpdate(prevProps) {
    const previousLocation = prevProps.location;

    // Don't scroll when we open or leave a modal
    if (
      (this.props.location.state && this.props.location.state.modal) ||
      (previousLocation.state && previousLocation.state.modal)
    ) {
      return;
    }

    // Smooth scroll to top if the location hasn't changed
    if (previousLocation.pathname === this.props.location.pathname) {
      smoothScroll.animateScroll(0);
      return;
    }

    this.props.onCloseDrawer();
    window.scrollTo(0, 0);
  }

  closeModal() {
    const { history, location } = this.props;

    const isModal = !!(location.state &&
      location.state.modal &&
      this.previousLocation !== location); // not initial render

    const returnTo = this.previousLocation.pathname;

    if (isModal) {
      history.push(returnTo);
    }
  }

  render() {
    const { location, drawerOpen, onToggleDrawer, headerTitle } = this.props;

    const isModal = !!(location.state &&
      location.state.modal &&
      this.previousLocation !== location);

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
              <Route path="/news/:newsId" component={News} />
              <Route path="/newsletters" component={Newsletters} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer />
        </Main>
        <ModalContainer
          isOpen={isModal}
          pathname={location.pathname}
          onRequestClose={this.closeModal}
        >
          {isModal
            ? [
              <Route
                location={location}
                path="/event/:eventId"
                render={props => <Event onRequestClose={this.closeModal} isModal {...props} />}
                key={`event-${location.pathname}`}
              />,
              <Route
                location={location}
                path="/news/:newsId"
                render={props => <News onRequestClose={this.closeModal} isModal {...props} />}
                key={`news-${location.pathname}`}
              />,
              <Route
                location={location}
                path="/speaker/:speakerId"
                render={props => <Speaker onRequestClose={this.closeModal} isModal {...props} />}
                key={`speaker-${location.pathname}`}
              />,
              <Route
                location={location}
                path="/stand/:standId"
                render={props => <Stand onRequestClose={this.closeModal} isModal {...props} />}
                key={`stand-${location.pathname}`}
              />,
            ]
            : null}
        </ModalContainer>
        <SnackbarContainer />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.shape({
      modal: PropTypes.bool,
    }),
  }).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  drawerOpen: PropTypes.bool,
  onCloseDrawer: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  headerTitle: PropTypes.string,
};

App.defaultProps = {
  drawerOpen: false,
  headerTitle: '',
  location: {
    pathname: '',
    state: {
      modal: false,
    },
  },
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
    onCloseDrawer: () => {
      dispatch(closeDrawer());
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
