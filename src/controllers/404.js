import view from '../views/404.js';

export default (ctx, next) => {
  ctx.currentPage = '404';
  const main = window.document.querySelector('main');
  main.innerHTML = view();
  next();
};
