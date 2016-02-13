var loginController = require('./login-controller.js');
var loginDirective = require('./login-directive.js');

module.exports = angular.module('beamer.common.login', [])
    .controller('LoginController', ['$scope', '$state', 'auth', '$location',
        '$mdToast', loginController
    ])
    .directive('loginForm', loginDirective);
