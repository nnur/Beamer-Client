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
                blogs: ['$stateParams', 'DSHttpAdapter', 'currentUser', 'apiEndpoint', 'Blog', function($stateParams, DSHttpAdapter, currentUser, apiEndpoint, Blog) {
                    // For url query params
                    var params = {};
                    var options = {
                        basePath: apiEndpoint + '/users/' + $stateParams.username + '/routes/' + $stateParams.routename + '/'
                    };
                    // Use the adapter for custom basepath
                    return DSHttpAdapter
                        .findAll(Blog, params, options)
                        .then(function(res) {
                            // inject manually, due to adapter
                            _.each(res.data.blogs, function(blog) {
                                Blog.inject(blog);
                            });
                            return res.data.blogs;
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
