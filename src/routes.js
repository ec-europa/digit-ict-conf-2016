import h from 'preact/src/h';
import Router from 'preact-router';

import {
    App,
    Home,
    Speakers,
    Programme,
  } from './containers';

export default () => {
  return (
    <Router>
      <App default>
        <Router>
          <Home path="/" />
          <Speakers path="/speakers" />
          <Programme path="/programme" />
        </Router>
      </App>
    </Router>
  );
};
