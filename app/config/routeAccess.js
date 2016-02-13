var routeAccess = function($rootScope, $state, auth, unprotected, session) {

    // This establishes route protection when the app starts.
    var isRouteProtected = function(route) {
        return !_.contains(unprotected, route);
    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //prevent a logged in user from seeing the login page
        if (auth.isAuthenticated() && toState.name == 'login') {
            event.preventDefault();
            $state.go('users.routes', {username: sessionStorage.username})
        }
        //prevent a non-logged in user from seeing the apps contents
        else if (isRouteProtected(toState.name) && !auth.isAuthenticated()) {
            console.warn('Route ' + toState.url + ' requires an auth token.');
            $state.go('login');
        }
    });

    $rootScope.$on('userLogoutSuccess', function() {
        $state.go('login');
    })

}

module.exports = routeAccess;
