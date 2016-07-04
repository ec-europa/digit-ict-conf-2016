import { loadModule, errorLoading } from '../../utils/loader';

export default function createRoute(path = 'my-digitec') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./Container')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
  };
}
