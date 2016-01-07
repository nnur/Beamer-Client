var EditBlogsController = require('./edit-blogs-controller');

module.exports = angular.module('beamer.views.blog.editBlogs', [])
    .controller('EditBlogsController', ['$scope', '$state', '$stateParams', '$mdToast', 'Blog', 'apiEndpoint', 'Route', 'unsavedChanges', EditBlogsController]);
