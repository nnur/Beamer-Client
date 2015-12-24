var routeAccess = function($rootScope, $location, auth, unprotected) {

    // This establishes route protection when the app starts.
    var isRouteProtected = function(route) {
        return !_.contains(unprotected, route);
    };

    $rootScope.$on('$routeChangeStart', function() {
        if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
            debugger;
            console.warn('Route ' + $location.url() + ' requires an auth token.');
            $location.path('/');
        }
    });

}

module.exports = routeAccess;
