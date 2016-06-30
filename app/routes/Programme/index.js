import { loadModule, errorLoading } from '../../utils/loader';
import childRoutes from './routes';

export default function createRoute(path = 'programme') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Programme')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
    childRoutes,
  };
}
