var logoutModalController = require('./logout-modal-controller.js');
var templateUrl = require('ngtemplate!html!./logout-modal-template.html');

var logoutModal = function($mdDialog) {
    this.show = function() {
        $mdDialog.show({
            templateUrl: templateUrl,
            parent: angular.element(document.body),
            controller: ['$scope', 'auth','$mdDialog', 'User', 'session', logoutModalController],
            clickOutsideToClose: true
        });
    };
};

module.exports = logoutModal;
