var editRouteModalService = require('./edit-route-modal-service.js');

module.exports = angular.module('beamer.common.editRouteModal', [])
    .service('editRouteModal', ['$mdDialog', 'User', 'session', editRouteModalService]);
