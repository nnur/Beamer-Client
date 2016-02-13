var RoutesPanelCtrl = require('./routes-panel-controller');
var templateUrl = require('ngtemplate!html!./routes-panel-directive.html');

var routesPanel = function() {
    return {
        restrict: 'E',
        templateUrl: templateUrl,
        scope: {
            currentUser: '='
        },
        controller: ['$scope', '$state', 'session', 'DS', 'DSHttpAdapter', 'apiEndpoint', 'User', 'Route', '$mdToast', '$mdSidenav', '$mdDialog', 'auth', 'logoutModal', 'editRouteModal', RoutesPanelCtrl],
        controllerAs: 'routesPanelCtrl'
    }

}

module.exports = routesPanel;
