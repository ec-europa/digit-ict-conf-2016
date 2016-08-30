import MyDigitec from './MyDigitec';
import Export from './Export';
import Import from './Import';

export default function createRoute(path = 'my-digitec') {
  return {
    path,
    indexRoute: {
      component: MyDigitec,
    },
    childRoutes: [{
      path: '/export',
      component: Export,
    }, {
      path: '/import/:data',
      component: Import,
    }],
  };
}
