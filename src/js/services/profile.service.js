export default class Profile {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
    }

    // Retrieve a user's profile
    get(username) {
        return this._$http({
            url: this._AppConstants.api + '/profiles/' + username,
            method: 'GET'
        }).then((res) => {
            return res.data.profile;
        })
    }

    // Unfollow a user
    unfollow(username) {
        return this._$http({
            url: this._AppConstants.api + '/profiles/' + username + '/follow',
            method: 'DELETE'
        }).then((res) => res.data );
    }

    // Follow a user
    follow(username) {
        return this._$http({
            url: this._AppConstants.api + '/profiles/' + username + '/follow',
            method: 'POST'
        }).then((res) => res.data );
    }
    
}