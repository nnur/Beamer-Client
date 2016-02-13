var BlogController = function($scope, $stateParams, $mdSidenav, $state, logoutModal, User, Blog, Route, session, currentUser, blogs, DSHttpAdapter, apiEndpoint, DS) {
    // Private
    this.$mdSidenav_ = $mdSidenav;
    this.$state_ = $state;
    this.$stateParams_ = $stateParams;
    this.Blog_ = Blog;
    this.User_ = User;
    this.Route_ = Route;
    this.apiEndpoint_ = apiEndpoint;
    this.DSHttpAdapter_ = DSHttpAdapter;

    // // Public
    this.logoutModal = logoutModal;
    this.currentUser = User.get(session.getUsername());
    this.searchQuery = "";
    this.blogs = Route.get($stateParams.routename).blogs;
    this.blogsToShow = angular.copy(Route.get($stateParams.routename).blogs);
    this.selectedMode = 'md-scale';

    var self = this;
    $scope.$watch(function() {
        return self.searchQuery;
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
            return _.contains(blog.title.toLowerCase(), self.searchQuery.toLowerCase());
        }, true);
    });

    // This is so the edit blog panel updates
    $scope.$watch(function() {
        return self.blogs;
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
            return _.contains(blog.title, self.searchQuery);
        }, true);
    }, true);

    // This is so the sidepanel updates, because sidepanel is actually bound to
    // the Routes blogs
    $scope.$watch(function() {
        return self.Route_.get(self.$stateParams_.routename).blogs.length;
    }, function(newVal, oldVal) {
        self.blogs = self.Route_.get(self.$stateParams_.routename).blogs;
        self.blogsToShow = _.filter(angular.copy(self.Route_.get(self.$stateParams_.routename).blogs), function(blog) {
            return _.contains(blog.title, self.searchQuery);
        }, true);
    }, true);

    // text angular stuff
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
    if (state === 'users.routes') {
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
