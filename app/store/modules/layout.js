/*
 *
 * Constants
 *
 */

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const UPDATE_SCROLL = 'UPDATE_SCROLL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const UPDATE_HEADER_TITLE = 'UPDATE_HEADER_TITLE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

/*
 * Initial state
 */
const initialState = {
  drawerIsOpen: false,
  isScrollingUp: false,
  lastScrollTop: 0,
  headerPinned: true,
  headerUnpinned: false,
  modalOpen: false,
  headerTitle: '',
  snackbar: {
    open: false,
    message: '',
    onRequestUndo: null,
  },
};

const scrollOffest = 80;

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, { drawerIsOpen: !state.drawerIsOpen });
    case CLOSE_DRAWER:
      return Object.assign({}, state, { drawerIsOpen: false });
    case OPEN_MODAL:
      return Object.assign({}, state, {
        modalOpen: true,
      });
    case OPEN_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: {
          open: true,
          message: action.message,
          onRequestUndo: action.onRequestUndo,
        },
      });
    case CLOSE_SNACKBAR:
      return Object.assign({}, state, {
        snackbar: {
          open: false,
          message: '',
          onRequestUndo: null,
        },
      });
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        modalOpen: false,
      });
    case UPDATE_HEADER_TITLE:
      return Object.assign({}, state, {
        headerTitle: action.title,
      });
    case UPDATE_SCROLL: {
      const scrollTop = window.scrollY;
      return Object.assign({}, state, {
        lastScrollTop: scrollTop,
        isScrollingUp: state.lastScrollTop > scrollTop,
        headerPinned: scrollTop < scrollOffest || state.lastScrollTop > scrollTop,
        headerUnpinned: scrollTop >= scrollOffest && state.lastScrollTop <= scrollTop,
      });
    }
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

export function handleScroll() {
  return {
    type: UPDATE_SCROLL,
  };
}

export function openModal(content) {
  return {
    type: OPEN_MODAL,
    content,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function updateHeaderTitle(title) {
  return {
    type: UPDATE_HEADER_TITLE,
    title,
  };
}

export function openSnackbar(message, onRequestUndo = null) {
  return {
    type: OPEN_SNACKBAR,
    message,
    onRequestUndo,
  };
}

export function closeSnackbar() {
  return {
    type: CLOSE_SNACKBAR,
  };
}
