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

/*
 * Merge route into the global application state
 */
export default function reducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, locationBeforeTransitions: action.payload };
    default:
      return state;
  }
}

/*
 * Selectors
 */
export const selectLocationState = () => {
  let prevRoutingState;

  return (state) => {
    const routingState = state.route;
    if (routingState !== prevRoutingState) {
      prevRoutingState = routingState;
    }

    return prevRoutingState;
  };
};
