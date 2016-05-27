import view from '../views/speakers.js';
import { fetchContent } from '../utils/fetchContent';

export default (ctx, next) => {
  ctx.currentPage = 'speakers';
  const main = window.document.querySelector('main');
  fetchContent('data/speakers.json', (speakers) => {
    main.innerHTML = view(speakers);
  });
  next();
};
