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
        message: '',
        action: {
          label: '',
          onClick: () => {},
        },
        ...action.snackbar,
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
    snackbar,
  };
}

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}
