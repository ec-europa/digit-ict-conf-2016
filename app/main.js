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
import { syncHistoryWithStore } from 'react-router-redux';

// Create redux store
const store = configureStore();

// Create custom history
const history = syncHistoryWithStore(useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
}), store, {
  selectLocationState: state => state.route,
});

history.listen(location => console.log(location.state));


// Set up the router, wrapping all Routes in the App component
import childRoutes from './routes';
import Root from './Root';
import { closeDrawer } from './store/modules/ui/drawer';

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={{
        component: Root,
        childRoutes,
      }}
      render={applyRouterMiddleware(useScroll((prevRouterProps, { routes }) => {
        if (routes.some(route => route.ignoreScrollBehavior)
          || (prevRouterProps && prevRouterProps.routes.some(route => route.ignoreScrollBehavior))) {
          return false;
        }

        const state = store.getState();
        if (state.ui.drawer.isOpen) {
          store.dispatch(closeDrawer());
        }

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
