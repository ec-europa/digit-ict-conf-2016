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
        System.import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/speakers',
      name: 'speakers',
      getComponent(nextState, cb) {
        System.import('containers/SpeakersPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '/programme',
      name: 'programmePage',
      getComponent(nextState, cb) {
        System.import('containers/ProgrammePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
