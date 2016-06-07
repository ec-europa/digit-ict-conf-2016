import { createStore } from 'redux';

let ACTIONS = {
  OPEN_SPEAKER_MODAL: ({ ...state }, { speaker }) => ({
    ...state
  }),
};

const INITIAL = {
  todos: []
};

export default createStore((state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
