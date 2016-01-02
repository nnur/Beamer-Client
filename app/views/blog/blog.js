var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', ['textAngular'])
    .controller('BlogController', ['$scope', blogController]);
