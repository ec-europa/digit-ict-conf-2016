import render from 'preact/src/render';
import h from 'preact/src/h';
import Redux from 'preact-redux';

import store from './redux/store';
import Routes from './routes';

render((
  <Redux.Provider store={store}>
    <Routes />
  </Redux.Provider>
), window.document.body);
