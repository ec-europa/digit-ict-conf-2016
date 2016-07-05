import Speaker from './container/Speaker';

export default function createRoute(path = ':speakerId') {
  return {
    path,
    component: Speaker,
    ignoreScrollBehavior: true,
  };
}
