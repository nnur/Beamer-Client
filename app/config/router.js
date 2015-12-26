var router = function($routeProvider) {
    $routeProvider

        .when('/edit', {
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .when('/profile/:username', {
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl',
            resolve: {
                user: function($route, DS) {
                    var username = $route.current.params.username;
                    return DS.find('users', username).then(function(user) {
                        return DS.loadRelations('users', user.username, ['routes'])
                            .then(function(user) {
                                return user;
                            });
                    });
                }
            }
        })
        .when('/', {
            templateUrl: 'views/landing/landing-view.html',
        })
        .otherwise('/');
};

module.exports = router;
