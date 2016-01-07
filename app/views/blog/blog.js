var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', [])
    .controller('BlogController', ['$scope', '$stateParams', '$mdSidenav',
        '$state', 'logoutModal', 'User', 'Blog', 'Route', 'session', 'currentUser', 'blogs', 'DSHttpAdapter', 'apiEndpoint',
        'DS', blogController
    ]);
