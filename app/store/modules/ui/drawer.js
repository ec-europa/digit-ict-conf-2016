/*
 * Constants
 */
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

/*
 * Initial state
 */
const initialState = {
  isOpen: false,
};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, { isOpen: !state.isOpen });
    case CLOSE_DRAWER:
      return Object.assign({}, state, { isOpen: false });
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
