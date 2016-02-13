var landingViewUrl = require('ngtemplate!html!../views/landing/landing-view.html');
var editBlogsViewUrl = require('ngtemplate!html!../views/blog/editBlogs/edit-blogs.html');
var routesViewUrl = require('ngtemplate!html!../views/user/routes/routes-view.html');
var blogsViewUrl = require('ngtemplate!html!../views/blog/blog-view.html');

var router = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('users', {
            url: '/users',
            template: '<ui-view></ui-view>'
        })
        .state('users.routes', {
            url: '/:username/routes',
            templateUrl: routesViewUrl,
            // template: 'leo',
            controller: 'RoutesController',
            controllerAs: 'routesCtrl',
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
            templateUrl: blogsViewUrl,
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
                blogs: ['$stateParams', 'DSHttpAdapter', 'currentUser', 'apiEndpoint', 'Blog', 'Route', function($stateParams, DSHttpAdapter, currentUser, apiEndpoint, Blog, Route) {
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
                            return Route.get($stateParams.routename).blogs;
                        });
                }]
            },
            controllerAs: 'blogCtrl'
        })
        .state('blogs.edit', {
            url: '/:blogid',
            templateUrl: editBlogsViewUrl,
            controller: 'EditBlogsController',
            controllerAs: 'editBlogCtrl'
        })
        .state('/', {
            url: '/',
            templateUrl: landingViewUrl,
        })
};

module.exports = router;
