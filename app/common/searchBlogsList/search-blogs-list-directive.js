var SearchBlogsListCtrl = require('./search-blogs-list-controller');

var routesPanel = function() {
    return {
        restrict: 'E',
        scope: {
            blogs: '=',
            noBlogs: '&'
        },
        templateUrl: 'common/searchBlogsList/search-blogs-list-directive.html',
        controller: SearchBlogsListCtrl,
        controllerAs: 'searchBlogsListCtrl',
        link: function(scope, e, a, controller) {
            scope.$watch('blogs', function(newVal) {
                controller.blogs = newVal;
            })
        }
    }

}

module.exports = routesPanel;
