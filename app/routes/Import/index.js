import Import from './Import';

export default function createRoute(path = '/import(/:code)') {
  return {
    path,
    component: Import,
  };
}
