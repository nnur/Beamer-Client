var EditBlogsController = require('./edit-blogs-controller');

module.exports = angular.module('beamer.views.blog.editBlogs', [])
    .controller('EditBlogsController', ['$stateParams', 'Blog', EditBlogsController]);
