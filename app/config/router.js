var router = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider

        .state('edit', {
            url: '/edit',
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .state('profile', {
            url: '/profile/{username}',
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController',
            controllerAs: 'profileCtrl',
            resolve: {
                currentUser: function($stateParams, DS, User) {
                    var username = $stateParams.username;
                    return User.find(username).then(function(currentUser) {
                        return currentUser;
                    });
                }
            }
        })
        .state('blogs', {
            url: '/users/:username/routes/:routename/blogs/:blogname',
            templateUrl: 'views/blog/blog-view.html',
            controller: 'BlogController',
            resolve: {
                currentUser: ['$stateParams', 'DS', 'User', function($stateParams, DS, User) {
                    // Pull out the data from the route
                    var username = $stateParams.username;
                    var routename = $stateParams.routename;
                    var blogname = $stateParams.blogname;

                    // Attempt to load the user from the cache
                    var currentUser = User.get(username);
                    // if the user isn't in the cache, get it from the server
                    if (_.isUndefined(currentUser)) {
                        currentUser = User.find(username).then(function(currentUser) {
                            return currentUser;
                        });
                    }
                    return currentUser;
                }],
                blogs: ['currentUser', 'Blog', 'User', 'Route', function(currentUser, Blog, User, Route) {
                    return Blog.findAll().then(function(blogs) {
                        return Blog.getAll();
                    }).catch(function(err) {
                        console.log(err);
                    });
                }]
            },
            controllerAs: 'blogCtrl'
        })
        .state('/', {
            url: '/',
            templateUrl: 'views/landing/landing-view.html',
        })
};

module.exports = router;
