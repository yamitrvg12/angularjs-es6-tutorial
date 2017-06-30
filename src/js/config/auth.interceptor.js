function authInterceptor(JWT, AppConstants, $window, $q) {
    'ngInject';

    return {
        // automatically attach Authorization header
        request: (config) => {
            if(config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
                config.headers.Authorization = 'Token ' + JWT.get();
            }
            return config;
        },

        // Handle 401
        responseError: (rejection) => {
            if(rejection.status === 401) {
                // Clear any JWT token being stored
                JWT.destroy();
                
                // Do a hard page reload
                $window.location.reload();
            }

            return $q.reject(rejection);
        }
    }
}

export default authInterceptor;