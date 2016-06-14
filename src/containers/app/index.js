import h from 'preact/src/h';
import Component from 'preact/src/Component';
import Menu from './menu';
import Header from './header';
import Modal from './modal';

export default class App extends Component {
  render() {
    return (
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Modal/>
        <Header />
        <Menu />
        <main class="mdl-layout__content">
          <a name="top"></a>

          {this.props.children}

          <footer class="mdl-mini-footer ict-footer">
            <div class="mdl-mini-footer__left-section">
              <div class="mdl-logo">Organised by</div>
              <ul class="mdl-mini-footer__link-list">
                <li><a href="#"><img src="assets/images/logos/commission.png" class="ict-footer-organizer-logo" /></a></li>
                <li><a href="#"><img src="assets/images/logos/parliament.png" class="ict-footer-organizer-logo" /></a></li>
              </ul>
              </div>
              <div class="mdl-mini-footer__right-section">
                <a class="mdl-typography--font-light" href="#top">
                  Back to Top
                  <i class="material-icons">expand_less</i>
                </a>
              </div>
            </footer>
          </main>
      </div>
    );
  }
}
