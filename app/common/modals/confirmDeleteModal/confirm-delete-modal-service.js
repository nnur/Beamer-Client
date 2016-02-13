var confrimDeleteModalController = require('./confirm-delete-modal-controller.js');
var templateUrl = require('ngtemplate!html!./confirm-delete-modal-template.html');

var confrimDeleteModal = function($mdDialog, User, session) {
    this.showConfirmation = function(route) {
        var currentUser = User.get(session.getUsername())
        $mdDialog.show({
            templateUrl: templateUrl,
            parent: angular.element(document.body),
            controller: ['$scope', '$mdDialog', 'User', 'session', 'auth', confrimDeleteModalController],
            controllerAs: 'confrimDeleteModalCtrl',
            locals: {
                currentUser: currentUser
            },
            clickOutsideToClose: true,
        });
    };
};

module.exports = confrimDeleteModal;
