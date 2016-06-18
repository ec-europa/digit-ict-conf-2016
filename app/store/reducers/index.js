import { combineReducers } from 'redux';
import route from './route';
import events from './events';

export default combineReducers({
  route,
  events,
});
