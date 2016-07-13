/**
 * Create the store
 */

import { createStore, compose, combineReducers } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import schedule from './modules/schedule';
import layout from './modules/layout';

export default function configureStore() {
  const reducer = combineReducers({
    schedule,
    layout,
  });

  const enhancers = [
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
