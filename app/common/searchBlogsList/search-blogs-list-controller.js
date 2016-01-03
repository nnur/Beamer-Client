var SearchBlogsListCtrl = function($scope, $state, $stateParams) {
    //Private
    this.$state_ = $state;
    this.$stateParams_ = $stateParams;

    // Public
    this.blogs = $scope.blogs;
    this.noBlogs = $scope.noBlogs();
};

SearchBlogsListCtrl.prototype.openBlog = function(blog) {
    this.$state_.go('blogs', {
        username: this.$stateParams_.username,
        routename: this.$stateParams_.routename,
        blogid: blog.id
    })
};

module.exports = SearchBlogsListCtrl;
