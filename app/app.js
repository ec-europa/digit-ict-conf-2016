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
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import configureStore from './store/configure';

// Import the CSS resets and base theme
import './theme/base.scss';

// Create redux store with history
const store = configureStore();

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from './store/modules/route';

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

// Set up the router, wrapping all Routes in the Layout component
import Layout from './layout/Layout';
import createRoutes from './routes';
const rootRoute = {
  component: Layout,
  childRoutes: createRoutes(store),
};

import { closeDrawer } from './store/modules/layout';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={rootRoute}
      render={applyRouterMiddleware(useScroll(() => {
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
