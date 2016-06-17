import { combineReducers } from 'redux';
import route from './routeReducer';
import events from './eventsReducer';
import speakers from './speakersReducer';

export default combineReducers({
  route,
  events,
  speakers,
});
