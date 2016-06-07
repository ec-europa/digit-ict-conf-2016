import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Menu extends Component {
  constructor() {
    super();
    this.state.menu = [{
      label: 'Home',
      link: '/',
      active: false,
    }, {
      label: 'Speakers',
      link: '/speakers',
      active: false,
    }, {
      label: 'Programme',
      link: '/programme',
      active: false,
    }, {
      label: 'Expo',
      link: '/expo',
      active: false,
    }, {
      label: 'Practical',
      link: '/practical',
      active: false,
    }, {
      label: 'Previous editions',
      link: '/previous',
      active: false,
    }];
  }

  onClick() {
    const drawer = document.querySelector('.mdl-layout__drawer');
    document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    drawer.classList.remove('is-visible');
  }

  render(props, { menu }) {
    return (
      <nav-drawer class="mdl-layout__drawer" onClick={this.onClick}>
        <span class="mdl-layout-title">
          <img class="ict-drawer-logo" src="assets/images/DIGITEC-logo-v.png" />
          29/11/2016 BRUSSELS
        </span>
        <nav class="mdl-navigation">
          {menu.map(item =>
          <a class={'mdl-navigation__link' + (item.active ? ' is-active' : '')} href={item.link}>
            {item.label}
          </a>
          )}
          <div class="ict-drawer-separator"></div>
          <a class="mdl-navigation__link" href="#">
            Register
          </a>
          <a class="mdl-navigation__link" href="#digitec16">
            #digitec16
          </a>
        </nav>
      </nav-drawer>
    );
  }
}
