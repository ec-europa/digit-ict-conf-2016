import view from '../views/speakers.js';
import { fetchContent } from '../utils/fetchContent';

export default (ctx, next) => {
  // Set current page
  ctx.currentPage = 'speakers';

  // Get DOM element to populate
  const main = window.document.querySelector('main');

  if (ctx.state.speakers) {
    // If speakers are cached, display them
    main.innerHTML = view(ctx.state.speakers);
  } else {
    fetchContent('data/speakers.json', (speakers) => {
      // Cache speakers for further use
      ctx.state.speakers = speakers;
      ctx.save();

      // Display speakers
      main.innerHTML = view(speakers);
    });
  }

  next();
};
