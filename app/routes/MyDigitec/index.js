import container from './Container';

export default function createRoute(path = 'my-digitec') {
  return {
    path,
    component: container,
  };
}
