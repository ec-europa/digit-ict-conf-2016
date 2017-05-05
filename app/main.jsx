/**
 * main.jsx
 *
 * This is the entry file for the application
 */

// Polyfills
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Prepare app
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import configureStore from './store';
import App from './App';

// Base styles
import './ui/theme/base.scss';

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
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const { whyDidYouUpdate } = require('why-did-you-update');
  /* eslint-enable global-require */
  whyDidYouUpdate(React, { exclude: /^(CSSTransitionGroup|Link|Connect|Route|Switch)/ });
}

if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const offlineRuntime = require('offline-plugin/runtime');
  const { openSnackbar, closeSnackbar } = require('./store/modules/ui/snackbar');
  /* eslint-enable global-require */

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
}
