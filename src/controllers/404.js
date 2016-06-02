import view from '../views/404.js';
import render from '../utils/render.js';

export default (ctx, next) => {
  ctx.currentPage = '404';

  const main = window.document.querySelector('#ict-main');
  const content = view();

  render(main, content);

  next();
};
