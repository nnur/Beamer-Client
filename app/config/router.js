var router = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('users', {
            url: '/users',
            template: '<ui-view></ui-view>'
        })
        .state('users.routes', {
            url: '/:username/routes',
            templateUrl: 'views/profile/profile-view.html',
            // template: 'leo',
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
            url: '/users/:username/routes/:routename/blogs',
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
        .state('blogs.edit', {
            url: '/:blogid',
            templateUrl: 'views/blog/editBlogs/edit-blogs.html',
            controller: 'EditBlogsController',
            controllerAs: 'editBlogCtrl'
        })
        .state('/', {
            url: '/',
            templateUrl: 'views/landing/landing-view.html',
        })
};

module.exports = router;
