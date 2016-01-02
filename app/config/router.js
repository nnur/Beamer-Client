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
                currentUser: function($route, DS, User) {
                    var username = $route.current.params.username;
                    return User.find(username).then(function(currentUser) {
                        return currentUser;
                    });
                }
            }
        })
        .when('/users/:username/routes/:routename/blogs/:blogname', {
            templateUrl: 'views/blog/blog-view.html',
            controller: 'BlogController',
            resolve: {
                currentUser: function($route, DS, User) {
                    // Pull out the data from the route
                    var username = $route.current.params.username;
                    var routename = $route.current.params.routename;
                    var blogname = $route.current.params.blogname;

                    // Attempt to load the user from the cache
                    var currentUser = User.get(username);
                    // if the user isn't in the cache, get it from the server
                    if (_.isUndefined(currentUser)) {
                        currentUser = User.find(username).then(function(currentUser) {
                            return currentUser;
                        });
                    }
                    return currentUser;
                }
            },
            controllerAs: 'blogCtrl'
        })
        .when('/', {
            templateUrl: 'views/landing/landing-view.html',
        })
        .otherwise('/');
};

module.exports = router;
