/**
 * App
 */

import React from 'react';
import Helmet from 'react-helmet';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import smoothScroll from 'smooth-scroll';

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

import MainContainer from './containers/layout/Main';
import NavigationContainer from './containers/layout/Navigation';

import Footer from './ui/components/App/Footer/Footer';
import Content from './ui/components/App/Content/Content';
import ModalContainer from './containers/generic/Modal';
import SnackbarContainer from './containers/generic/Snackbar';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.previousLocation = props.location;
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.location.pathname === this.props.location.pathname &&
      !((this.props.location.state && this.props.location.state.modal) ||
        (nextProps.location.state && nextProps.location.state.modal))
    ) {
      // Smooth scroll to top if the location hasn't changed
      smoothScroll.animateScroll(0);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.location.pathname !== this.props.location.pathname;
  }

  componentWillUpdate(nextProps) {
    // Set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!this.props.location.state || !this.props.location.state.modal) &&
      (nextProps.location.state && nextProps.location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  componentDidUpdate(prevProps) {
    // Don't scroll when we open or leave a modal, or when the location hasn't changed
    if (
      (this.props.location.state && this.props.location.state.modal) ||
      (prevProps.location.state && prevProps.location.state.modal) ||
      this.props.location === prevProps.location
    ) {
      return;
    }

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
    const { location } = this.props;

    const isModal = !!(location.state &&
      location.state.modal &&
      this.previousLocation !== location);

    const childrenKey = isModal
      ? this.previousLocation.pathname
      : location.pathname;

    return (
      <div>
        <Helmet titleTemplate="DIGITEC 2016 - %s" />
        <MainContainer contentKey={childrenKey} isModal={isModal}>
          <NavigationContainer isModal={isModal} />
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
        </MainContainer>
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
                  render={props => (
                    <Event
                      onRequestClose={this.closeModal}
                      isModal
                      {...props}
                    />
                  )}
                  key={`event-${location.pathname}`}
                />,
                <Route
                  location={location}
                  path="/news/:newsId"
                  render={props => (
                    <News onRequestClose={this.closeModal} isModal {...props} />
                  )}
                  key={`news-${location.pathname}`}
                />,
                <Route
                  location={location}
                  path="/speaker/:speakerId"
                  render={props => (
                    <Speaker
                      onRequestClose={this.closeModal}
                      isModal
                      {...props}
                    />
                  )}
                  key={`speaker-${location.pathname}`}
                />,
                <Route
                  location={location}
                  path="/stand/:standId"
                  render={props => (
                    <Stand
                      onRequestClose={this.closeModal}
                      isModal
                      {...props}
                    />
                  )}
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
};

App.defaultProps = {
  location: {
    pathname: '',
    state: {
      modal: false,
    },
  },
};

export default withRouter(App);
