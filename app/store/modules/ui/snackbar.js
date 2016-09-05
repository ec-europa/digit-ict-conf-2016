/*
 * Constants
 */
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

/*
 * Initial state
 */
const initialState = {};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR: {
      return {
        open: true,
        timeout: 5000,
        message: '',
        action: {
          label: '',
          onClick: () => {},
        },
        ...action.payload,
      };
    }
    case CLOSE_SNACKBAR: {
      return {
        open: false,
      };
    }
    default: {
      return state;
    }
  }
}

/*
 * Actions
 */
export function openSnackbar(snackbar) {
  return {
    type: OPEN_SNACKBAR,
    payload: snackbar,
  };
}

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}
