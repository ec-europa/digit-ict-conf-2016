import render from 'preact/src/render';
import h from 'preact/src/h';
import Redux from 'preact-redux';
import { createStore, combineReducers } from 'redux';

//import store from './redux/store';
import Routes from './routes';

import events from './redux/reducers/events';
import modal from './redux/reducers/modal';

const reducer = combineReducers({
  events,
  modal,
});
console.log('EXIIIIIT');

const INITIAL = {
  events: [],
  modal: {},
};

const store = createStore(reducer);


render((
  <Redux.Provider store={store}>
    <Routes />
  </Redux.Provider>
), window.document.body);
