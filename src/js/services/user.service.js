export default class User {
    constructor(AppConstants, $http, JWT, $state, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._http = $http;
        this._JWT = JWT;
        this._$q = $q;
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

    verifyAuth() {
        let deferred = this._$q.defer();

        // Check for JWT token first, verify that is not loging.
        if(!this._JWT.get()) {
            deferred.resolve(false);
            return deferred.promise;
        }

        // If there's a JWT & user is already set
        if(this.current) {
            deferred.resolve(true);
        } else {
            // If current user isn't set, get it from the server.
            // If server doesn't 401, set current user & resolve promise.
            
            this._http({
                url: this._AppConstants.api + '/user',
                method: 'GET'
            }).then(
                (res) => {
                    this.current = res.data.user;
                    deferred.resolve(true);
                },
                // If an error happens, that means the user's token was invalid.
                (err) => {
                    this._JWT.destroy();
                    deferred.resolve(false);
                }
                // Reject automatically handled by auth interceptor
                // Will boot them to homepage
            )
        }

        return deferred.promise;
    }

    // This method will be used by UI-Router resolves
    ensureAuthIs(bool) {
        let deferred = this._$q.defer();

        this.verifyAuth().then((authValid) => {
            // if it's the opposite, redirect home
            if(authValid !== bool) {
                this._$state.go('app.home');
                deferred.resolve(false);
            } else {
                deferred.resolve(true);
            }
        })

        return deferred.promise;
    }
}