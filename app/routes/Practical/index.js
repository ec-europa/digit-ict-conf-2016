import { loadModule, errorLoading } from '../../utils/loader';

export default function createRoute(path = 'practical') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Practical')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
  };
}
