/*
 *
 * Events
 *
 */
import data from '../../../content/events.json';

/**
 * Other actions
 */
import { openNotification } from './notification';

/*
 * Constants
 */
export const ADD_TO_MY_SCHEDULE = 'ADD_TO_MY_SCHEDULE';
export const REMOVE_FROM_MY_SCHEDULE = 'REMOVE_FROM_MY_SCHEDULE';

/*
 * Initial state
 */
const initialState = {};
data.filter(event => event.register).forEach(event => {
  initialState[event.id] = false;
});

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_MY_SCHEDULE: {
      return Object.assign({}, state, {
        [action.event.id]: true,
      });
    }
    case REMOVE_FROM_MY_SCHEDULE: {
      return Object.assign({}, state, {
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
export function toggleEvent(event) {
  return (dispatch, getState) => {
    const { schedule } = getState();

    if (schedule[event.id]) {
      dispatch(openNotification({
        id: `${event.id}-remove`,
        title: 'Event removed...',
        body: `<strong>${event.title}</strong> has been removed from your DIGITEC.`,
        action: {
          label: 'Undo',
          callback: () => dispatch(toggleEvent(event)),
        },
      }));

      return dispatch({
        type: REMOVE_FROM_MY_SCHEDULE,
        event,
      });
    }

    dispatch(openNotification({
      id: `${event.id}-add`,
      title: 'Event added!',
      body: `<strong>${event.title}</strong> has been added to your DIGITEC.`,
      action: {
        label: 'Undo',
        callback: () => dispatch(toggleEvent(event)),
      },
    }));

    return dispatch({
      type: ADD_TO_MY_SCHEDULE,
      event,
    });
  };
}
