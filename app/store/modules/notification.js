/*
 * Constants
 */
export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';


/*
 * Initial state
 */
const initialState = {};

/*
 * Reducer
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_NOTIFICATION: {
      const notification = {
        id: JSON.stringify(action.notification),
        title: '',
        body: '',
        ...action.notification,
      };

      return notification;
    }
    case CLOSE_NOTIFICATION: {
      return {};
    }
    default: {
      return state;
    }
  }
}

/*
 * Actions
 */
export function openNotification(notification) {
  return {
    type: OPEN_NOTIFICATION,
    notification,
  };
}

export function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION,
  };
}
