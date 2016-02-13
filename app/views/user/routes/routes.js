/**
 * @file Defines the `profile` module.
 * @author Naila Nur
 */
var routesController = require('./routes-controller');

module.exports = angular.module('beamer.views.user.routes', [])
    .controller('RoutesController', ['$scope', 'currentUser', '$mdSidenav', 'auth', '$mdDialog', 'User', 'logoutModal', 'confirmDeleteModal',
        routesController
    ]);
