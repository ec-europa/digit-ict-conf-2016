/*
 *
 * ProgrammePage reducer
 *
 */

import { DEFAULT_ACTION } from './constants';
import speakers from '../../../data/speakers.json';

const defaultSpeaker = {
  id: '',
};

const initialState = speakers.map(speaker => Object.assign({}, defaultSpeaker, speaker));

function speakersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default speakersReducer;
