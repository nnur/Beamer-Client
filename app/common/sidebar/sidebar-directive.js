var templateUrl = require('ngtemplate!html!./sidebar-directive.html');

var sidebar = function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: templateUrl
    };
};

module.exports = sidebar;
