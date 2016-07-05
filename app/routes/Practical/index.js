import Practical from './container/Practical';

export default function createRoute(path = 'practical') {
  return {
    path,
    component: Practical,
  };
}
