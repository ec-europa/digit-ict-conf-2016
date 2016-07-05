import Home from './container/Home';

export default function createRoute(path = '/') {
  return {
    path,
    component: Home,
  };
}
