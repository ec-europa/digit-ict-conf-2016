import home from './Home';
import speakers from './Speakers';
import programme from './Programme';
import myDigitec from './MyDigitec';
import practical from './Practical';
import notFound from './NotFound';

export const routes = [
  home(),
  speakers(),
  programme(),
  myDigitec(),
  practical(),
  notFound(),
];

export default routes;
