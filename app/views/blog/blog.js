var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', [])
    .controller('BlogController', ['User', 'session', 'currentUser', 'blogs', blogController]);
