/**
 * Create the store
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers/index';

export default function configureStore(initialState = {}, history = browserHistory) {
  // routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (process.env.NODE_ENV !== 'production') {
    const devtools = window.devToolsExtension || (() => noop => noop);
    enhancers.push(devtools());
  }

  return createStore(
    reducer,
    initialState,
    compose(...enhancers)
  );
}
