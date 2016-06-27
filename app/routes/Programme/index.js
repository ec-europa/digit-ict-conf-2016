import { loadModule, errorLoading } from '../../utils/loader';

export default function createRoute(path = 'programme') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Programme')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
  };
}
