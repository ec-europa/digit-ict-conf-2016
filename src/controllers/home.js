import view from '../views/home.js';
import render from '../utils/render.js';

export default (ctx, next) => {
  ctx.currentPage = 'home';

  const main = window.document.querySelector('#ict-main');
  const content = view();

  render(main, content);

  next();
};
