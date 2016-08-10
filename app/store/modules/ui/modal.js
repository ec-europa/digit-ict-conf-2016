/**
 * Constants
 */
export const OPEN_MODAL = 'OPEN_MODAL';
export const DEFINE_MODAL = 'DEFINE_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/**
 * Initial state
 */
const initialState = {
  id: '',
  title: '',
  description: '',
  content: '',
  open: false,
  returnTo: '',
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, initialState, {
        ...action.payload,
        open: true,
      });
    case DEFINE_MODAL:
      return Object.assign({}, state, {
        ...action.payload,
      });
    case CLOSE_MODAL:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

/**
 * Actions
 */
export function openModal({ returnTo }) {
  return {
    type: OPEN_MODAL,
    payload: {
      returnTo,
    },
  };
}

export function defineModal({ id, title, description, content }) {
  return {
    type: DEFINE_MODAL,
    payload: {
      id,
      title,
      description,
      content,
    },
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
