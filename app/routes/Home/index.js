import { loadModule, errorLoading } from '../../utils/loader';

export default function createRoute(path = '/') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Home')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
  };
}
