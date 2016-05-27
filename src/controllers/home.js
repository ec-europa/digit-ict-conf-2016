import view from '../views/home.js';

export default (ctx, next) => {
  ctx.currentPage = 'home';
  const main = window.document.querySelector('main');
  main.innerHTML = view();
  next();
};
