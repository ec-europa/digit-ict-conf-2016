// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes() {
  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('scenes/Home/Home')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/speakers',
      name: 'speakers',
      getComponent(nextState, cb) {
        System.import('scenes/Speakers/Speakers')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/programme',
      name: 'programme',
      getComponent(nextState, cb) {
        System.import('scenes/Programme/Programme')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('scenes/NotFound/NotFound')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
