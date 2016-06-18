/*
 *
 * Events actions
 *
 */

import { ADD_TO_MY_SCHEDULE, REMOVE_FROM_MY_SCHEDULE } from '../constants/events';

export function addEvent(event) {
  return {
    type: ADD_TO_MY_SCHEDULE,
    event,
  };
}

export function removeEvent(event) {
  return {
    type: REMOVE_FROM_MY_SCHEDULE,
    event,
  };
}
