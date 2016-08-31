import Import from './Import';

export default function createRoute(path = '/import/:data') {
  return {
    path,
    component: Import,
  };
}
