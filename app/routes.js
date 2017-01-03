import React from 'react';
import { Route, IndexRoute } from 'react-router';

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

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="speakers" component={Speakers} />
    <Route path="speaker/:speakerId" component={Speaker} />
    <Route path="programme" component={Programme} />
    <Route path="my-digitec" component={MyDigitec} />
    <Route path="event/:eventId" component={Event} />
    <Route path="expo" component={Expo} />
    <Route path="stand/:standId" component={Stand} />
    <Route path="practical" component={Practical} />
    <Route path="gallery" component={Gallery} />
    <Route path="*" component={NotFound} />
  </Route>
);
