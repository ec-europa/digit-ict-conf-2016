/*
 *
 * Events
 *
 */
import data from '../../../content/events.json';

/*
 * Constants
 */
export const ADD_TO_MY_SCHEDULE = 'ADD_TO_MY_SCHEDULE';
export const REMOVE_FROM_MY_SCHEDULE = 'REMOVE_FROM_MY_SCHEDULE';
export const TOGGLE_EVENT = 'TOGGLE_EVENT';


/*
 * Initial state
 */
const initialState = [];
data.forEach(event => {
  initialState[event.id] = false;
});

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EVENT: {
      if (state[action.event.id]) {
        return reducer(state, Object.assign({}, action, { type: REMOVE_FROM_MY_SCHEDULE }));
      }
      return reducer(state, Object.assign({}, action, { type: ADD_TO_MY_SCHEDULE }));
    }
    case ADD_TO_MY_SCHEDULE: {
      return Object.assign([], state, {
        [action.event.id]: true,
      });
    }
    case REMOVE_FROM_MY_SCHEDULE: {
      return Object.assign([], state, {
        [action.event.id]: false,
      });
    }
    default: {
      return state;
    }
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

export function toggleEvent(event) {
  return {
    type: TOGGLE_EVENT,
    event,
  };
}
