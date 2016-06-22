/*
 *
 * Events
 *
 */

import { createSelector } from 'reselect';
import data from '../../data/events.json';
import memoize from 'lodash.memoize';
/*
 * Constants
 */
export const ADD_TO_MY_SCHEDULE = 'ADD_TO_MY_SCHEDULE';
export const REMOVE_FROM_MY_SCHEDULE = 'REMOVE_FROM_MY_SCHEDULE';

/*
 * Initial state
 */
const eventModel = {
  id: '',
  starts: '',
  ends: '',
  title: '',
  venue: '',
  description: [],
  speakers: [],
  attend: false,
};

const initialState = data.map(event => Object.assign({}, eventModel, event));

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
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

/*
 * Actions
 */
export function addEvent(event) {
  return {
    type: ADD_TO_MY_SCHEDULE,
    event,
  };
}

export function removeEvent(event) {
  return {
    type: REMOVE_FROM_MY_SCHEDULE,
    event,
  };
}

/*
 * Selectors
 */
const getEvents = (state) => state.events;

export const selectAllEvents = createSelector(
  getEvents,
  (events) => events
);

export const selectMyEvents = createSelector(
  selectAllEvents,
  (events) => events.filter(event => event.attend)
);

export const selectEventsBySpeaker = createSelector(
  selectAllEvents,
  events => memoize(
    speaker => events.filter(event => event.speakers.indexOf(speaker.id) >= 0)
  )
);
