import view from '../views/program.js';
import render from '../utils/render.js';

export default (ctx, next) => {
  ctx.currentPage = 'program';

  const main = window.document.querySelector('main');
  const content = view();

  render(main, content);

  next();
};
