var BlogController = function($scope, $stateParams, $mdSidenav, $mdSidenav, $state, logoutModal, User, Blog, session, currentUser, blogs) {
    // Private
    this.$mdSidenav_ = $mdSidenav;
    this.$mdSidenav_ = $mdSidenav;
    this.$state_ = $state;

    // Public
    this.logoutModal = logoutModal;
    this.currentUser = User.get(session.getUsername());
    this.searchQuery = "";
    this.blogs = blogs;
    this.blogsToShow = angular.copy(blogs);
    // No blog selected initiall
    this.currentBlog = Blog.get($stateParams.blogid);

    var self = this;
    $scope.$watch(function() {
        return self.searchQuery
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
            return _.contains(blog.title, self.searchQuery);
        }, true);
    });
    //text angular stuff
    $scope.htmlcontent = 'New post!';
    $scope.originalHtml = $scope.htmlcontent;
    $scope.disabled = false;
};

/**
 * @param  {string} state - the name of the sate to go to, see router
 * Move to a specific state with appropriate params
 */
BlogController.prototype.go = function(state) {
    var params = {};
    // Configure the params for this specific route, '/profile/:username'
    if (state === 'profile') {
        _.extend(params, {
            username: this.currentUser.username
        });
    }
    this.$state_.go(state, params)
};

BlogController.prototype.openSidebar = function() {
    // Do not allow user to toggle sidenav in desktop
    if (!this.$mdSidenav_('left').isLockedOpen()) {
        this.$mdSidenav_('left').toggle();
    } else {
        $mdOpenMenu();
    }
};


module.exports = BlogController;
