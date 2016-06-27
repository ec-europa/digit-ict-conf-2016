import { loadModule, errorLoading } from '../../../../utils/loader';

export default function createRoute(path = ':speakerId') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Speaker')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
    ignoreScrollBehavior: true,
  };
}
