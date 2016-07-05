/**
 * app.js
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

import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import configureStore from './store/configure';

// Create custom history
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});

// Create redux store with history
const store = configureStore(browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from './store/modules/route';

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
import { errorLoading, loadModule } from './utils/loader';
import childRoutes from './routes';

const rootRoute = {
  getComponent(nextState, cb) {
    System.import('./containers/App')
      .then(loadModule(cb))
      .catch(errorLoading);
  },
  childRoutes,
};


import { closeDrawer } from './store/modules/layout';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
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

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
