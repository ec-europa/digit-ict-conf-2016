import Speakers from './Speakers';

export default function createRoute(path = 'speakers') {
  return {
    path,
    component: Speakers,
  };
}
