export default menu => `
    <nav class="mdl-navigation">
      <header>DIGITEC 2016</header>
      ${menu.map(item => `
      <a class="mdl-navigation__link${item.active ? ' is-active' : ''}" href="${item.link}">
        <i class="mdl-color-text--blue-grey-400 material-icons">${item.icon}</i>${item.label}
      </a>
      `).join('')}
    </nav>
  `;
