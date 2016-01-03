var BlogController = function($scope, $stateParams, $mdSidenav, $state, logoutModal, User, Blog, session, currentUser, blogs, DSHttpAdapter, apiEndpoint) {
    // Private
    this.$mdSidenav_ = $mdSidenav;
    this.$state_ = $state;
    this.Blog_ = Blog;
    this.User_ = User;
    this.apiEndpoint_ = apiEndpoint;
    this.DSHttpAdapter_ = DSHttpAdapter;

    // // Public
    this.logoutModal = logoutModal;
    this.currentUser = User.get(session.getUsername());
    this.searchQuery = "";
    this.blogs = blogs;
    this.blogsToShow = angular.copy(blogs);
    this.selectedMode = 'md-scale';
    // No blog selected initiall
    // this.currentBlog = Blog.get($stateParams.blogid);

    var self = this;
    $scope.$watch(function() {
        return self.searchQuery
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
            return _.contains(blog.title, self.searchQuery);
        }, true);
    });
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

BlogController.prototype.createBlog = function() {
    var self = this;
    console.log(this.blogs);

    var newBlog = {
        title: this.currentBlog.title,
        text: this.currentBlog.text
    };
    this.DSHttpAdapter_.create(this.Blog_, newBlog, {
        basePath: this.apiEndpoint_ + '/users/' + this.currentUser.username + '/routes/noodleIsPreeCute'
    }).then(function(blog) {
        return self.Blog_.inject(blog.data);
    }).then(function(blogg) {
        console.log(blogg);
        // By this point, the route has been 
        // added and the user is in sync

    }).catch(function(err) {
        //self.showToast(err.statusText + ', blog not added')
        console.log(err);
    });
};



module.exports = BlogController;
