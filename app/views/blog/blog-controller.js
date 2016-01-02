var BlogController = function($scope, $mdSidenav, $mdSidenav, logoutModal, User, session, currentUser, blogs) {
    // Private
    this.$mdSidenav_ = $mdSidenav;
    this.$mdSidenav_ = $mdSidenav;

    // Public
    this.logoutModal = logoutModal;
    this.currentUser = User.get(session.getUsername());
    this.searchQuery = "";
    this.blogs = blogs;
    this.blogsToShow = angular.copy(blogs);

    var self = this;
    $scope.$watch(function() {
        return self.searchQuery
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
            return _.contains(blog.title, self.searchQuery);
        }, true);
        console.log(self.blogsToShow);
    })
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
