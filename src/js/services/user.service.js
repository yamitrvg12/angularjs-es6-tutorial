export default class User {
    constructor(AppConstants, $http, JWT, $state) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._http = $http;
        this._JWT = JWT;
        this._$state = $state;

        // Object to store our user properties
        this.current = null;
    }

    attemptAuth(type, credentials) {
        let route = (type === 'login') ? '/login' : '';

        return this._http({
            url: this._AppConstants.api + '/users' + route,
            method: 'POST',
            data: {
                user: credentials
            }
        }).then(res => {
            // Store the user's info for easy lookup
            this.current = res.data.user;

            // Set the JWT token
            this._JWT.save(res.data.user.token);

            return res;
        })
    }

    logout() {
        this.current = null;
        this._JWT.destroy();

        this._$state.go(this._$state.current, null, {reload: true});
    }
}