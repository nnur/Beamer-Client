var RoutesPanelCtrl = require('./routes-panel-controller');

var routesPanel = function() {
    return {
        restrict: 'E',
        templateUrl: 'common/routesPanel/routes-panel-directive.html',
        scope: {
            user: '=user'
        },
        controller: RoutesPanelCtrl,
        controllerAs: 'routesPanelCtrl'
    }

}

module.exports = routesPanel;
