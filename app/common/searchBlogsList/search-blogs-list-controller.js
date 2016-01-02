var SearchBlogsListCtrl = function($scope) {
    this.blogs = $scope.$parent.$parent.blogCtrl.blogsToShow;
};


module.exports = SearchBlogsListCtrl;
