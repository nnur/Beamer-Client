var logoutModalController = require('./logout-modal-controller.js');

var logoutModal = function($mdDialog) {
    this.show = function() {
        $mdDialog.show({
            templateUrl: './common/logoutModal/logout-modal-template.html',
            parent: angular.element(document.body),
            controller: logoutModalController,
            clickOutsideToClose: true
        });
    };
};

module.exports = logoutModal;
