import Speaker from './Speaker';

export default function createRoute(path = 'speaker/:speakerId') {
  return {
    path,
    component: Speaker,
    ignoreScrollBehavior: true,
  };
}
