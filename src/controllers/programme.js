/* global componentHandler */
import view from '../views/programme.js';
import { fetchContent } from '../utils/fetchContent';
import render from '../utils/render.js';

export default (ctx, next) => {
  ctx.currentPage = 'programme';

  // Get DOM element to populate
  const main = window.document.querySelector('#ict-main');
  let content = '';

  if (ctx.state.events) {
    // If events are cached, display them
    content = view(ctx.state.events);
    render(main, content);
  } else {
    fetchContent('data/events.json', (events) => {
      // Cache events for further use
      ctx.state.events = events;
      ctx.save();

      // Display events
      content = view(events);
      render(main, content);

      // Update MDL
      componentHandler.upgradeDom();
    });
  }

  next();
};
