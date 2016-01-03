var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', [])
    .controller('BlogController', ['$scope', '$stateParams', '$mdSidenav', '$mdSidenav',
        '$state', 'logoutModal', 'User', 'Blog', 'session', 'currentUser', 'blogs', blogController
    ]);
