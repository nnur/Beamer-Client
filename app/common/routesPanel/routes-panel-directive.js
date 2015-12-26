var routesPanel = function() {
    return {
        restrict: 'E',
        templateUrl: 'common/routesPanel/routes-panel-directive.html',
        scope: {
            routes: '=routes'
        },
    }

}

module.exports = routesPanel;
