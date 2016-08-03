/*
 * Constants
 */
export const UPDATE_HEADER_TITLE = 'UPDATE_HEADER_TITLE';

/*
 * Initial state
 */
const initialState = {
  title: '',
};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_HEADER_TITLE:
      return Object.assign({}, state, {
        title: action.title,
      });
    default:
      return state;
  }
}

/*
 * Actions
 */
export function updateHeaderTitle(title) {
  return {
    type: UPDATE_HEADER_TITLE,
    title,
  };
}
