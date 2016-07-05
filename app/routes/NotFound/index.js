import NotFound from './container/NotFound';

export default function createRoute(path = '*') {
  return {
    path,
    component: NotFound,
  };
}
