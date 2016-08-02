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
import useScroll from 'react-router-scroll';
import configureStore from './store/configure';

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

import { closeDrawer } from './store/modules/layout';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={rootRoute}
      render={applyRouterMiddleware(useScroll((prevRouterProps, { routes }) => {
        if (routes.some(route => route.ignoreScrollBehavior)
          || (prevRouterProps && prevRouterProps.routes.some(route => route.ignoreScrollBehavior))) {
          return false;
        }
        store.dispatch(closeDrawer());
        return true;
      }))}
    />
  </Provider>,
  document.getElementById('app')
);

// Install ServiceWorker and AppCache
import { install } from 'offline-plugin/runtime';

install();
