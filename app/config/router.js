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
                user: function($route, DS, User) {
                    var username = $route.current.params.username;
                    return User.find(username).then(function(user) {
                        return User.loadRelations(user.username, ['routes'])
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
