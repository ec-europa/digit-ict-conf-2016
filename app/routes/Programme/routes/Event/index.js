import Event from './Event';

export default function createRoute(path = ':eventId') {
  return {
    path,
    component: Event,
    ignoreScrollBehavior: true,
  };
}
