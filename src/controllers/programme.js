import view from '../views/programme.js';
import render from '../utils/render.js';

export default (ctx, next) => {
  ctx.currentPage = 'programme';

  const main = window.document.querySelector('main');
  const content = view();

  render(main, content);

  next();
};
