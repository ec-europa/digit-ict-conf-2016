/**
 * Create the store
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import route from './modules/route';
import events from './modules/events';
import drawer from './modules/drawer';

export default function configureStore(initialState = {}, history = browserHistory) {
  const reducer = combineReducers({
    route,
    events,
    drawer,
  });


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
