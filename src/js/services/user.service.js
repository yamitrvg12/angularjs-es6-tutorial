export default class User {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._http = $http;

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
            
            return res;
        })
    }
}