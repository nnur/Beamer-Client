var routeListItem = function() {
    return {
        restrict: 'E',
        scope: {
            routename: '=routename'
        },
        templateUrl: 'common/routeListItem/route-list-item-directive.html',
    };
};

module.exports = routeListItem;
