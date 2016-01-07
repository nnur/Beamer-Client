var BlogController = function($scope, $stateParams, $mdSidenav, $state, logoutModal, User, Blog, session, currentUser, blogs, DSHttpAdapter, apiEndpoint, DS) {
    // Private
    this.$mdSidenav_ = $mdSidenav;
    this.$state_ = $state;
    this.$stateParams_ = $stateParams;
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
        return self.searchQuery;
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
            return _.contains(blog.title, self.searchQuery);
        }, true);
    });

    $scope.$watch(function() {
        return self.blogs;
    }, function(newVal, oldVal) {
        self.blogsToShow = _.filter(angular.copy(self.blogs), function(blog) {
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


BlogController.prototype.createBlog = function() {
    console.log('here');
    var self = this;
    return this.Blog_.create({
        title: '',
        text: ''
    }, {
        basePath: this.apiEndpoint_ + '/users/' + this.$stateParams_.username + '/routes/' +
            this.$stateParams_.routename
    }).then(function(res) {
        self.$state_.go('blogs.edit', {
            username: self.$stateParams_.username,
            routename: self.$stateParams_.routename,
            blogid: res.id
        });

        self.$mdToast_.show(
            self.$mdToast_.simple()
            .textContent('Blog created!')
            .position('top right')
            .hideDelay(3000)
        );
    }).catch(function(err) {
        self.$mdToast_.show(
            self.$mdToast_.simple()
            .textContent(err)
            .position('top right')
            .hideDelay(3000)
        );
    });
};

BlogController.prototype.updateBlog = function() {
    var self = this;
    this.Blog_.update(this.$stateParams_.blogid, {
        title: this.currentBlog.title,
        text: this.currentBlog.text
    }, {
        basePath: this.apiEndpoint_
    }).then(function() {
        self.$mdToast_.show(
            self.$mdToast_.simple()
            .textContent('Blog updated!')
            .position('top right')
            .hideDelay(3000)
        );
    })
};

BlogController.prototype.deleteBlog = function() {
    var self = this;
    this.Blog_.destroy(this.$stateParams_.blogid, {
        basePath: 'http://127.0.0.1:1337/'
    }).then(function() {
        self.$state_.go('blogs', {
            username: self.$stateParams_.username,
            routename: self.$stateParams_.routename
        });
        self.$mdToast_.show(
            self.$mdToast_.simple()
            .textContent('Blog deleted!')
            .position('top right')
            .hideDelay(3000)
        );
    })
};



module.exports = BlogController;
