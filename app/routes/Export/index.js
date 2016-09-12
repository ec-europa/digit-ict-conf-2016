import Export from './Export';

export default function createRoute(path = 'export') {
  return {
    path,
    component: Export,
  };
}
