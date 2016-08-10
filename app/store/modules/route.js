/**
 * Constants
 */
import { LOCATION_CHANGE } from 'react-router-redux';

/*
 * Initial state
 */
const initialState = {
  locationBeforeTransitions: null,
};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return Object.assign({}, state, {
        locationBeforeTransitions: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}
