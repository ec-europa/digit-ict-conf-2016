/*
 *
 * Constants
 *
 */

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

/*
 * Initial state
 */
const initialState = {
  open: false,
};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, { open: !state.open });
    case CLOSE_DRAWER:
      return Object.assign({}, state, { open: false });
    default:
      return state;
  }
}

/*
 * Actions
 */
export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}
