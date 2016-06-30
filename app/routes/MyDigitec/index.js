import { loadModule, errorLoading } from '../../utils/loader';
import childRoutes from './routes';

export default function createRoute(path = 'my-digitec') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./Container')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
    childRoutes,
  };
}
