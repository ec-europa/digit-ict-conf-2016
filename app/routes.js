import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  Event,
  Home,
  MyDigitec,
  NotFound,
  Practical,
  Programme,
  Root,
  Speakers,
  Speaker,
} from './containers/views/';

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="speakers" component={Speakers} />
    <Route path="speaker/:speakerId" component={Speaker} />
    <Route path="programme" component={Programme} />
    <Route path="my-digitec" component={MyDigitec} />
    <Route path="event/:eventId" component={Event} />
    <Route path="practical" component={Practical} />
    <Route path="*" component={NotFound} />
  </Route>
);
