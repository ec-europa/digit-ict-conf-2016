import { createStore } from 'redux';

let ACTIONS = {
  OPEN_SPEAKER_MODAL: ({ showSpeaker, ...state }, { speaker }) => ({
    showSpeaker: speaker, ...state
  }),

  CLOSE_MODAL: ({ showSpeaker, ...state }) => ({
    showSpeaker: null, ...state
  }),

  ADD_TO_MY_SCHEDULE: ({ myEvents, ...state }, { event }) => ({
    myEvents: [...myEvents, event], ...state
  }),

  REMOVE_FROM_MY_SCHEDULE: ({ myEvents, ...state }, { event }) => ({
    myEvents: myEvents.filter( i => i!==event ), ...state
  })
};

const INITIAL = {
  myEvents: [],
  showSpeaker: null,
};

export default createStore((state, action) => (
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
