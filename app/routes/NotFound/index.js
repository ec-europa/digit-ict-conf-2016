import { loadModule, errorLoading } from '../../utils/loader';

export default function createRoute(path = '*') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/NotFound')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
  };
}
