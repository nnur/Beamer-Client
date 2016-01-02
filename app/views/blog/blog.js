var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', [])
    .controller('BlogController', ['$scope', '$mdSidenav', '$mdSidenav', 'logoutModal', 'User', 'session', 'currentUser', 'blogs', blogController]);
