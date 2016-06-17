/*
 *
 * ProgrammePage actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addEvent(event) {
  return {
    type: 'ADD_TO_MY_SCHEDULE',
    event,
  };
}

export function removeEvent(event) {
  return {
    type: 'REMOVE_FROM_MY_SCHEDULE',
    event,
  };
}
