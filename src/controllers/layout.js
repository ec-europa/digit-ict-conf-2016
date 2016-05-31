import view from '../views/partials/menu.js';
import render from '../utils/render.js';

export default (ctx) => {
  // Create the navigation
  const menu = [{
    label: 'Home',
    link: '/',
    active: ctx.currentPage === 'home',
  }, {
    label: 'Speakers',
    link: '/speakers',
    active: ctx.currentPage === 'speakers',
  }, {
    label: 'Programme',
    link: '/programme',
    active: ctx.currentPage === 'programme',
  }, {
    label: 'Expo',
    link: '/expo',
    active: ctx.currentPage === 'speakers',
  }, {
    label: 'Practical',
    link: '/practical',
    active: ctx.currentPage === 'speakers',
  }, {
    label: 'Previous editions',
    link: '/previous',
    active: ctx.currentPage === 'speakers',
  }];

  const element = window.document.querySelector('nav-drawer');
  const content = view(menu);

  render(element, content);
};
