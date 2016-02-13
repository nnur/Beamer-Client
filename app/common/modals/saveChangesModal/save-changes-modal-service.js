var saveChangesModalController = require('./save-changes-modal-controller.js');
var templateUrl = require('ngtemplate!html!./save-changes-modal-template.html');


var saveChangesModalService = function($mdDialog, User, session) {

    this.showConfirmation = function(route) {
        var currentUser = User.get(session.getUsername())
        return $mdDialog.show({
            templateUrl: templateUrl,
            parent: angular.element(document.body),
            controller: ['$scope', '$mdDialog', 'User', 'session', 'auth', saveChangesModalController],
            controllerAs: 'saveChangesCtrl',
            locals: {
                currentUser: currentUser
            },
            clickOutsideToClose: true,
        });
    };
};

module.exports = saveChangesModalService;
