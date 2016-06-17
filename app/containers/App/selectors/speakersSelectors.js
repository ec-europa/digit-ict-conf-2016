import { createSelector } from 'reselect';

/**
 * Direct selector to the speakers state domain
 */
const getSpeakers = (state) => state.speakers;

export const selectAllSpeakers = createSelector(
  getSpeakers,
  (speakers) => speakers
);
