var SearchBlogsListCtrl = require('./search-blogs-list-controller');

var routesPanel = function() {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'common/searchBlogsList/search-blogs-list-directive.html',
        controller: SearchBlogsListCtrl,
        controllerAs: 'searchBlogsListCtrl'
    }

}

module.exports = routesPanel;
