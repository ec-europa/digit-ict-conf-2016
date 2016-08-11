import home from './Home';
import speakers from './Speakers';
import speaker from './Speaker';
import programme from './Programme';
import event from './Event';
import myDigitec from './MyDigitec';
import practical from './Practical';
import notFound from './NotFound';
import Root from './Root';

export const routes = {
  component: Root,
  childRoutes: [
    home(),
    speakers(),
    speaker(),
    programme(),
    myDigitec(),
    event(),
    practical(),
    notFound(),
  ],
};

export default routes;
