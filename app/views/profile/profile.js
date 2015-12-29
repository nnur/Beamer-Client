/**
 * @file Defines the `profile` module.
 * @author Naila Nur
 */
var profileController = require('./profile-controller');

var profileModule = angular.module('beamer.views.profile', [])
    .controller('ProfileController', ['$scope', 'user', '$mdSidenav', 'auth', '$mdDialog',
        profileController
    ]);

module.exports = profileModule;
