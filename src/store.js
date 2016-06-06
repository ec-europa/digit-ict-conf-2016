import { fetchContent } from './utils/fetchContent';

export default {
  speakers: [],
  events: [],

  init: () => {

  },

  getSpeakers: function (cb) {
    if (this.speakers.length > 0) {
      return cb(this.speakers);
    }

    return fetchContent('data/speakers.json', (speakers) => {
      // Cache speakers for further use
      this.speakers = speakers;
      return cb(this.speakers);
    });
  },
};
