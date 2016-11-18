/**
 * main.js
 *
 * This is the entry file for the application
 */
import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import applyRouterMiddleware from 'react-router/es6/applyRouterMiddleware';
import Router from 'react-router/es6/Router';
import useRouterHistory from 'react-router/es6/useRouterHistory';

// Prepare app
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'react-router-scroll/lib/useScroll';
import smoothScroll from 'smooth-scroll';
import offlineRuntime from 'offline-plugin/runtime';

import configureStore from './store';
import appRoutes from './routes';
import { closeDrawer } from './store/modules/ui/drawer';
import { openSnackbar, closeSnackbar } from './store/modules/ui/snackbar';

// Create custom history
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

// Create redux store
const store = configureStore();

// Define app's entry point
ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={appRoutes}
      render={applyRouterMiddleware(useScroll((prevRouterProps, nextRouterProps) => {
        // At initialization
        if (!prevRouterProps || !nextRouterProps) {
          return true;
        }

        const previousLocation = prevRouterProps.location;
        const nextLocation = nextRouterProps.location;

        // Only scroll to top if the location hasn't changed
        if (previousLocation.pathname === nextLocation.pathname) {
          smoothScroll.animateScroll(0);
          return false;
        }

        // Don't scroll when we open or leave a modal
        if (
          (nextLocation.state && nextLocation.state.modal)
          || (previousLocation.state && previousLocation.state.modal)
        ) {
          return false;
        }

        store.dispatch(closeDrawer());
        return true;
      }))}
    />
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
