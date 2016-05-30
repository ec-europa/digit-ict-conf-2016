import view from '../views/partials/menu.js';
import render from '../utils/render.js';

export default (ctx) => {
  // Create the navigation
  const menu = [{
    icon: 'home',
    label: 'home',
    link: '/',
    active: ctx.currentPage === 'home',
  }, {
    icon: 'home',
    label: 'program',
    link: '/program',
    active: ctx.currentPage === 'program',
  }, {
    icon: 'people',
    label: 'speakers',
    link: '/speakers',
    active: ctx.currentPage === 'speakers',
  }];

  const element = window.document.querySelector('nav-drawer');
  const content = view(menu);

  render(element, content);
};
