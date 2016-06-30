import { loadModule, errorLoading } from '../../../../utils/loader';

export default function createRoute(path = ':eventId') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Event')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
    ignoreScrollBehavior: true,
  };
}
