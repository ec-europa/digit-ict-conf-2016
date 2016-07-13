import Programme from './Programme';

export default function createRoute(path = 'programme') {
  return {
    path,
    component: Programme,
  };
}
