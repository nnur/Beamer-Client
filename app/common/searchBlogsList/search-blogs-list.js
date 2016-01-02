var searchBlogsList = require('./search-blogs-list-directive.js');

module.exports = angular.module('beamer.common.searchBlogsList', [])
    .directive('searchBlogsList', [searchBlogsList]);
