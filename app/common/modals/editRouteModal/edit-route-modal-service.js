var editRouteModalController = require('./edit-route-modal-controller.js');

var editRouteModal = function($mdDialog, User, session) {
    this.openEditMenu = function(route) {
        $mdDialog.show({
            templateUrl: './common/modals/editRouteModal/edit-route-modal-template.html',
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

module.exports = editRouteModal;
