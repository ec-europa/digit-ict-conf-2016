/**
 * Create the store
 */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerMiddleware } from 'react-router-redux';

import route from './modules/route';
import schedule from './modules/schedule';
import layout from './modules/layout';

export default function configureStore(history) {
  const reducer = combineReducers({
    route,
    schedule,
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
    {},
    compose(...enhancers)
  );

  persistStore(store, {
    whitelist: ['schedule'],
  });

  return store;
}
