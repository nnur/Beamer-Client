var BlogsListCtrl = function($scope, $state, $stateParams, $mdSidenav) {
    //Private
    this.$state_ = $state;
    this.$stateParams_ = $stateParams;
    this.$mdSidenav_ = $mdSidenav

    // Public
    this.blogs = $scope.blogs;
    this.noBlogs = $scope.noBlogs();
};

BlogsListCtrl.prototype.openBlog = function(blog) {
    this.closeSidebar();
    this.$state_.go('blogs.edit', {
        username: this.$stateParams_.username,
        routename: this.$stateParams_.routename,
        blogid: blog.id
    });
};

BlogsListCtrl.prototype.closeSidebar = function() {
    // Do not allow user to toggle sidenav in desktop
    if (!this.$mdSidenav_('left').isLockedOpen()) {
        this.$mdSidenav_('left').toggle();
    }
};

module.exports = BlogsListCtrl;
