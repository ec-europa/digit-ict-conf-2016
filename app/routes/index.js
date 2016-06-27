import home from './Home';
import speakers from './Speakers';
import programme from './Programme';
import notFound from './NotFound';

export const routes = [
  home(),
  speakers(),
  programme(),
  notFound(),
];

export default routes;
