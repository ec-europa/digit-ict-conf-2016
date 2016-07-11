import Programme from './Programme';
import childRoutes from './routes';

export default function createRoute(path = 'programme') {
  return {
    path,
    component: Programme,
    childRoutes,
  };
}
