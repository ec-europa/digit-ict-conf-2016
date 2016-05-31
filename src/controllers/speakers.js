import view from '../views/speakers.js';
import { fetchContent } from '../utils/fetchContent';
import render from '../utils/render.js';

export default (ctx, next) => {
  // Set current page
  ctx.currentPage = 'speakers';

  // Get DOM element to populate
  const main = window.document.querySelector('#ict-main');
  let content = '';

  if (ctx.state.speakers) {
    // If speakers are cached, display them
    content = view(ctx.state.speakers);
  } else {
    fetchContent('data/speakers.json', (speakers) => {
      // Cache speakers for further use
      ctx.state.speakers = speakers;
      ctx.save();

      // Display speakers
      content = view(speakers);
    });
  }

  render(main, content);

  next();
};
