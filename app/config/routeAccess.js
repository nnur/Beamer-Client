var routeAccess = function($rootScope, $location, auth, unprotected, session) {

    // This establishes route protection when the app starts.
    var isRouteProtected = function(route) {
        return !_.contains(unprotected, route);
    };

    var isMainPage = function(route) {
        return _.contains(['', '/'], route);
    };

    $rootScope.$on('$routeChangeStart', function() {
        if (auth.isAuthenticated() && isMainPage($location.url())) {
            $location.path('/profile/' + sessionStorage.username);
        }

        if (isRouteProtected($location.url()) && !auth.isAuthenticated()) {
            console.warn('Route ' + $location.url() + ' requires an auth token.');
            $location.path('/');
        }
    });

    $rootScope.$on('userLogoutSuccess', function() {
        $location.path('/');
    })

}

module.exports = routeAccess;
