var sidebar = function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'common/sidebar/sidebar-directive.html'
    };
};

module.exports = sidebar;
