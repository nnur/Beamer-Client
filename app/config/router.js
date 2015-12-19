var router = function($routeProvider) {
    $routeProvider

        .when('/edit', {
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .when('/profile/:username', {
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController',
            resolve: {
                user: function($route, DS) {

                    // TODO: remove these mocks
                    return {
                        routes: [{
                            routename: 'fitness'
                        }, {
                            routename: 'lovenoodle'
                        }]
                    };

                    var username = $route.current.params.username;
                    return DS.find('users', username).then(function(user) {
                        DS.loadRelations('users', user.username, ['routes']).then(function(user) {
                            console.log(user);
                        }, function(err) {
                            console.log(err);
                        });
                    });
                }
            }
        })
        .when('/', {
            templateUrl: 'views/landing/landing-view.html',
        });
};

module.exports = router;
