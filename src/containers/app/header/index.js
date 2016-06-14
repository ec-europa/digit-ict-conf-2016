import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Header extends Component {
  render(props, { menu }) {
    return (
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">
            <a href="/">
              <picture>
                <source srcset="assets/images/DIGITEC-logo-h.png" media="(min-width: 1024px)" />
                <img srcset="assets/images/DIGITEC-logo_no-title.png" alt="DIGITEC 2016" class="header-logo-image" />
              </picture>
            </a>
          </span>
          <div class="mdl-layout-spacer"></div>
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="mdl-navigation__link" href="/speakers">Speakers</a>
            <a class="mdl-navigation__link" href="/programme">Programme</a>
            <a class="mdl-navigation__link" href="">Register</a>
          </nav>
        </div>
      </header>
    );
  }
}
