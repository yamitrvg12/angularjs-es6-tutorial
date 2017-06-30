function AuthConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {
      auth: (User) => {
        User.ensureAuthIs(false);
      }
    }
  })
  
  .state('app.register', {
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {
      auth: (User) => {
        User.ensureAuthIs(false);
      }
    }
  });

};

export default AuthConfig;
