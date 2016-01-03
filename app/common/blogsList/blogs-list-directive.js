var BlogsListCtrl = require('./blogs-list-controller');

var blogsList = function() {

    return {
        restrict: 'E',
        scope: {
            blogs: '=',
            noBlogs: '&'
        },
        templateUrl: 'common/blogsList/blogs-list-directive.html',
        controller: BlogsListCtrl,
        controllerAs: 'blogsListCtrl',
        link: function(scope, e, a, controller) {
            scope.$watch('blogs', function(newVal) {
                controller.blogs = newVal;
            })
        }
    }

}

module.exports = blogsList;
