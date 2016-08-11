/**
 * main.js
 *
 * This is the entry file for the application
 */
import 'babel-polyfill';

// Import the CSS resets and base theme
import './theme/base.scss';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import applyRouterMiddleware from 'react-router/es6/applyRouterMiddleware';
import Router from 'react-router/es6/Router';
import useRouterHistory from 'react-router/es6/useRouterHistory';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'react-router-scroll/lib/useScroll';
import configureStore from './store';
import smoothScroll from 'smooth-scroll';

// Create custom history
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

// Create redux store
const store = configureStore();

// Set up the router, wrapping all Routes in the App component
import childRoutes from './routes';
import App from './App';

const rootRoute = {
  component: App,
  childRoutes,
};

import { closeDrawer } from './store/modules/ui/drawer';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={rootRoute}
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
  document.getElementById('app')
);

// Prompt for adding the app to the home screen
import 'add-to-homescreen/dist/addtohomescreen.min';
import 'add-to-homescreen/dist/style/addtohomescreen.css';

window.addToHomescreen({
  message: {
    en_us: {
      ios: 'To add this web app to the home screen: tap on <strong>share button</strong> and then <strong>Add to Home Screen</strong>',
      android: 'To add this web app to the home screen: open the browser <strong>option menu</strong> and tap on <strong>Add to Home screen</strong>',
    },
  },
});

// Install ServiceWorker and AppCache
import { install } from 'offline-plugin/runtime';

install();
