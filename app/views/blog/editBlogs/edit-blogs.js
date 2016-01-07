var EditBlogsController = require('./edit-blogs-controller');

module.exports = angular.module('beamer.views.blog.editBlogs', [])
    .controller('EditBlogsController', ['$state', '$stateParams', '$mdToast', 'Blog', 'apiEndpoint', 'Route', EditBlogsController]);
