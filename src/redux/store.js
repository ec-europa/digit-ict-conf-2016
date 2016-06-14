import { createStore, combineReducers } from 'redux';
import events from './reducers/events';
import modal from './reducers/modal';

const reducer = combineReducers({
  events,
  modal,
});

const INITIAL = {
  events: [],
  modal: {},
};

export default createStore(reducer, INITIAL, window.devToolsExtension && window.devToolsExtension());
