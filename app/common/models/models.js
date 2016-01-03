var User = require('./User.js');
var Route = require('./Route.js');
var Blog = require('./Blog.js');

module.exports = angular.module('beamer.common.models', [])
    .factory('User', ['DS', 'apiEndpoint', 'session', User]).run(function(User) {})
    .factory('Route', ['DS', 'apiEndpoint', Route]).run(function(Route) {})
    .factory('Blog', ['DS', 'apiEndpoint', Blog]).run(function(Blog) {});
