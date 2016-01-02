var blogController = require('./blog-controller');

module.exports = angular.module('beamer.views.blog', [])
    .controller('BlogController', [blogController]);
