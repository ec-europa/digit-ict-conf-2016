import Speakers from './Speakers';
import childRoutes from './routes';

export default function createRoute(path = 'speakers') {
  return {
    path,
    component: Speakers,
    childRoutes,
  };
}
