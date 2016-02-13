var BlogsListCtrl = require('./blogs-list-controller');
var templateUrl = require('ngtemplate!html!./blogs-list-directive.html');

var blogsList = function() {

    return {
        restrict: 'E',
        scope: {
            blogs: '=',
            noBlogs: '&'
        },
        templateUrl: templateUrl,
        controller: ['$scope', '$state', '$stateParams', '$mdSidenav', BlogsListCtrl],
        controllerAs: 'blogsListCtrl',
        link: function(scope, e, a, controller) {
            scope.$watch('blogs', function(newVal) {
                controller.blogs = newVal;
            })
        }
    }

}

module.exports = blogsList;
