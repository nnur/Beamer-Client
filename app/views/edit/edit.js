var editController = require('./edit-controller');

module.exports = angular.module('beamer.views.edit', [])
    .controller('EditController', ["$scope", "$http", 'Upload',
        editController
    ]);
