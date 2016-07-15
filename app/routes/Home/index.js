import Home from './Home';

export default function createRoute(path = '/') {
  return {
    path,
    component: Home,
  };
}
