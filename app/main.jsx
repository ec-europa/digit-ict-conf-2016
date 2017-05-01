/**
 * main.jsx
 *
 * This is the entry file for the application
 */
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Prepare app
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import offlineRuntime from 'offline-plugin/runtime';

import configureStore from './store';
import Routes from './routes';
import { openSnackbar, closeSnackbar } from './store/modules/ui/snackbar';

import { Route, Switch } from 'react-router-dom';

import {
  Event,
  Gallery,
  Home,
  MyDigitec,
  NotFound,
  Practical,
  Programme,
  Root,
  Speaker,
  Speakers,
  Stand,
  Expo,
} from './containers/views/';


// Create custom history
const browserHistory = createBrowserHistory({
  basename: __BASENAME__,
});

// Create redux store
const store = configureStore();

// Define app's entry point
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

// Install ServiceWorker and AppCache
offlineRuntime.install({
  onInstalled: () => store.dispatch(openSnackbar({
    message: 'DIGITEC is ready to work offline',
    timeout: 0,
    action: {
      label: 'Dismiss',
      onClick: () => store.dispatch(closeSnackbar()),
    },
  })),
  onUpdateReady: () => offlineRuntime.applyUpdate(),
  onUpdated: () => store.dispatch(openSnackbar({
    message: 'DIGITEC has been updated',
    timeout: 0,
    action: {
      label: 'Reload',
      onClick: () => window.location.reload(),
    },
  })),
});
