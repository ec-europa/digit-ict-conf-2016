import Router from 'preact-router';
import h from 'preact/src/h';
import render from 'preact/src/render';

import Home from './components/home';
import Speakers from './components/speakers';
import Programme from './components/programme';
import Menu from './components/layout/menu';
import Header from './components/layout/header';

const Main = () => (
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <Header />
    <Menu />
    <main class="mdl-layout__content">
      <a name="top"></a>
      <Router>
        <Home path="/" />
        <Speakers path="/speakers" />
        <Programme path="/programme" />
      </Router>
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

render(<Main />, window.document.body);
