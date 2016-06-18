/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

import { LOCATION_CHANGE } from 'react-router-redux';

// Initial routing state
const routeInitialState = {
  locationBeforeTransitions: null,
};

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload };
    default:
      return state;
  }
}

export default routeReducer;
