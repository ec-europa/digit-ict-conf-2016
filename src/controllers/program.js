import view from '../views/program.js';

export default (ctx, next) => {
  ctx.currentPage = 'program';
  const main = window.document.querySelector('main');
  main.innerHTML = view();
  next();
};
