/*
 * Constants
 */
export const SET_CONTENT = 'SET_CONTENT';

/*
 * Initial state
 */
const initialState = [];

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

/*
 * Actions
 */
export function setContent(content) {
  return {
    type: SET_CONTENT,
    payload: content,
  };
}
