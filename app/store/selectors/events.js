import { createSelector } from 'reselect';

/**
 * Direct selector to the events state domain
 */
const getEvents = (state) => state.events;

export const selectAllEvents = createSelector(
  getEvents,
  (events) => events
);

export const selectMyEvents = createSelector(
  selectAllEvents,
  (events) => events.filter(event => event.attend)
);
