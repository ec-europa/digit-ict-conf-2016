import Event from './Event';

export default function createRoute(path = 'event/:eventId') {
  return {
    path,
    component: Event,
    ignoreScrollBehavior: true,
  };
}
