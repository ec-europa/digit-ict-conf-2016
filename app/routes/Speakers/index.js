import { loadModule, errorLoading } from '../../utils/loader';
import childRoutes from './routes';

export default function createRoute(path = 'speakers') {
  return {
    path,
    getComponent(nextState, cb) {
      System.import('./container/Speakers')
        .then(loadModule(cb))
        .catch(errorLoading);
    },
    childRoutes,
  };
}
