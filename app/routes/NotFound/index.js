import NotFound from './NotFound';

export default function createRoute(path = '*') {
  return {
    path,
    component: NotFound,
  };
}
