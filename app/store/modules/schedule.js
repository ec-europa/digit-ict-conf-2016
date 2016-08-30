/*
 *
 * Schedule
 *
 */
import data from '../../../content/events.json';

/**
 * Other actions
 */
import { openSnackbar } from './ui/snackbar';

/*
 * Constants
 */
import { REHYDRATE } from 'redux-persist/constants';

export const ADD_TO_MY_SCHEDULE = 'ADD_TO_MY_SCHEDULE';
export const BULK_ADD_TO_MY_SCHEDULE = 'BULK_ADD_TO_MY_SCHEDULE';
export const REMOVE_FROM_MY_SCHEDULE = 'REMOVE_FROM_MY_SCHEDULE';

/*
 * Initial state
 */
const initialState = {};
data.filter(event => event.register).forEach(event => {
  initialState[event.id] = false;
});

/**
 * Local variable
 */
let canRehydrate = true;

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
    case BULK_ADD_TO_MY_SCHEDULE: {
      canRehydrate = false;
      const newState = {};
      data.filter(event => event.register).forEach(event => {
        newState[event.id] = action.payload.indexOf(event.id) >= 0;
      });
      return newState;
    }
    case REMOVE_FROM_MY_SCHEDULE: {
      return Object.assign({}, state, {
        [action.event.id]: false,
      });
    }
    case REHYDRATE: {
      if (canRehydrate) {
        canRehydrate = false;
        const schedule = action.payload.schedule;
        if (schedule) {
          return { ...state, ...schedule };
        }
      }
      return { ...state };
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
      dispatch(openSnackbar({
        message: `<strong>${event.title}</strong> has been removed from your DIGITEC.`,
        action: {
          label: 'Undo',
          onClick: () => dispatch(toggleEvent(event)),
        },
      }));

      return dispatch({
        type: REMOVE_FROM_MY_SCHEDULE,
        event,
      });
    }

    dispatch(openSnackbar({
      message: `<strong>${event.title}</strong> has been added to your DIGITEC.`,
      action: {
        label: 'Undo',
        onClick: () => dispatch(toggleEvent(event)),
      },
    }));

    return dispatch({
      type: ADD_TO_MY_SCHEDULE,
      event,
    });
  };
}

export function importSchedule(events) {
  return (dispatch) => {
    dispatch(openSnackbar({
      message: 'Your schedule has been imported!',
    }));

    return dispatch({
      type: BULK_ADD_TO_MY_SCHEDULE,
      payload: events,
    });
  };
}
