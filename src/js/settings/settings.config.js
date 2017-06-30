function SettingsConfig($stateProvider) {
    'ngInject';

    $stateProvider
    .state('app.settings', {
        url: '/settings',
        controller: 'SettingsCtrl',
        templateUrl: 'settings/settings.html',
        title: 'Settings',
        resolve: {
            auth: (User) => {
                return User.ensureAuthIs(true);
            }
        }
    })
}

export default SettingsConfig;