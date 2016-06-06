import speakersListComponent from '../components/speakers/speakersList.js';
import render from '../utils/render.js';
import store from '../store.js';

export default (ctx, next) => {
  // Set current page
  ctx.currentPage = 'speakers';

  // Display speakers
  store.getSpeakers((speakers) => {
    // Get DOM element to populate
    const component = speakersListComponent(speakers);
    const main = window.document.querySelector('#ict-main');
    const content = component.render();
    render(main, content);
    component.bindEvents();
  });

  next();
};
