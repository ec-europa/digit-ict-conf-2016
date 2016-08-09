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
  open: false,
};

/**
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, initialState, {
        open: true,
      });
    case DEFINE_MODAL:
      return Object.assign({}, state, {
        id: action.id,
        title: action.title,
        description: action.description,
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
export function openModal() {
  return {
    type: OPEN_MODAL,
  };
}

export function defineModal({ id, title, description }) {
  return {
    type: DEFINE_MODAL,
    id,
    title,
    description,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
