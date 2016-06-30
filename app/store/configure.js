/**
 * Create the store
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import route from './modules/route';
import events from './modules/events';
import layout from './modules/layout';

export default function configureStore(initialState = {}, history = browserHistory) {
  const reducer = combineReducers({
    route,
    events,
    layout,
  });


  // routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ];

  if (process.env.NODE_ENV !== 'production') {
    const devtools = window.devToolsExtension || (() => noop => noop);
    enhancers.push(devtools());
  }

  const store = createStore(
    reducer,
    initialState,
    compose(...enhancers)
  );

  persistStore(store, {
    whitelist: ['events'],
  });

  return store;
}
