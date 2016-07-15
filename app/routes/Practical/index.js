import Practical from './Practical';

export default function createRoute(path = 'practical') {
  return {
    path,
    component: Practical,
  };
}
