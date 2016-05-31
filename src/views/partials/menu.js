export default menu => `
    <span class="mdl-layout-title">
      <img class="ict-drawer-logo" src="assets/images/DIGITEC-logo-v.png">
      29/11/2016 BRUSSELS
    </span>
    <nav class="mdl-navigation">
      ${menu.map(item => `
      <a class="mdl-navigation__link${item.active ? ' is-active' : ''}" href="${item.link}">
        ${item.label}
      </a>
      `).join('')}
      <div class="ict-drawer-separator"></div>
      <a class="mdl-navigation__link" href="#">
        Register
      </a>
      <a class="mdl-navigation__link" href="#digitec16">
        #digitec16
      </a>
    </nav>
  `;
