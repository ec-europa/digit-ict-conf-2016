/*
 *
 * Events reducer
 *
 */

import { ADD_TO_MY_SCHEDULE, REMOVE_FROM_MY_SCHEDULE } from '../constants/events';
import events from '../../data/events.json';

const defaultEvent = {
  id: '',
  starts: '',
  ends: '',
  title: '',
  venue: '',
  description: [],
  speakers: [],
  attend: false,
};

const initialState = events.map(event => Object.assign({}, defaultEvent, event));

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_MY_SCHEDULE:
      return state.map(event => {
        if (event.id === action.event.id) {
          return Object.assign({}, event, { attend: true });
        }
        return event;
      });
    case REMOVE_FROM_MY_SCHEDULE:
      return state.map(event => {
        if (event.id === action.event.id) {
          return Object.assign({}, event, { attend: false });
        }
        return event;
      });
    default:
      return state;
  }
}

export default eventsReducer;
