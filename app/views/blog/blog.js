var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', [])
    .controller('BlogController', ['$scope', 'User', 'session', 'currentUser', 'blogs', blogController]);
