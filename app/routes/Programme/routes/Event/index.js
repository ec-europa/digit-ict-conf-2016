import Event from './container/Event';

export default function createRoute(path = ':eventId') {
  return {
    path,
    component: Event,
    ignoreScrollBehavior: true,
  };
}
