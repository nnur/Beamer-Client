var editRouteModalController = require('./edit-route-modal-controller.js');
var templateUrl = require('ngtemplate!html!./edit-route-modal-template.html');


var editRouteModal = function($mdDialog, User, session) {
    this.openEditMenu = function(route) {
        $mdDialog.show({
            templateUrl: templateUrl,
            parent: angular.element(document.body),
            controller: ['$mdDialog', 'apiEndpoint', 'routename', 'currentUser', 'DSHttpAdapter', 'Route', 'User', editRouteModalController],
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
