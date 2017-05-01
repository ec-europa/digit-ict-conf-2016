import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Event,
  Gallery,
  Home,
  MyDigitec,
  NotFound,
  Practical,
  Programme,
  Root,
  Speaker,
  Speakers,
  Stand,
  Expo,
} from './containers/views/';

export default () => (
  <Route path="/">
    <Root>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/speakers" component={Speakers} />
        <Route path="/speaker/:speakerId" component={Speaker} />
        <Route path="/programme" component={Programme} />
        <Route path="/my-digitec" component={MyDigitec} />
        <Route path="/event/:eventId" component={Event} />
        <Route path="/expo" component={Expo} />
        <Route path="/stand/:standId" component={Stand} />
        <Route path="/practical" component={Practical} />
        <Route path="/gallery" component={Gallery} />
        <Route component={NotFound} />
      </Switch>
    </Root>
  </Route>
);
