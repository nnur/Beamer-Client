var blogsList = require('./blogs-list-directive.js');

module.exports = angular.module('beamer.common.blogsList', [])
    .directive('blogsList', [blogsList]);
