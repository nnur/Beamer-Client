var editRouteModalController = require('./edit-route-modal-controller.js');

var logoutModal = function($mdDialog, User, session) {
    this.openEditMenu = function(route) {
        $mdDialog.show({
            templateUrl: './common/editRouteModal/edit-route-modal-template.html',
            parent: angular.element(document.body),
            controller: editRouteModalController,
            controllerAs: 'editRouteDialgoueCtrl',
            locals: {
                currentUser: User.get(session.getUsername()),
                routename: route.routename
            },
            clickOutsideToClose: true
        });
    };
};

module.exports = logoutModal;
