var EditBlogsController = function($scope, $state, $stateParams, $mdToast, Blog, apiEndpoint, Route, unsavedChanges) {
    var emptyBlog = {
        text: '',
        title: ''
    };

    // if we are making a new blog, give the user an empty one to edit
    if ($stateParams.blogid === 'newBlog') {
        this.currentBlog = emptyBlog;
    } else {
        this.currentBlog = angular.copy(Blog.get($stateParams.blogid));
    }

    this.goldenBlog = angular.copy(this.currentBlog);
    this.Blog_ = Blog;
    this.Route_ = Route;
    this.$stateParams_ = $stateParams;
    this.$state_ = $state;
    this.$mdToast_ = $mdToast;
    this.apiEndpoint_ = apiEndpoint;
    this.unsavedChanges_ = unsavedChanges;
    this.basePath = this.apiEndpoint_ + '/users/' + this.$stateParams_.username + '/routes/' +
        this.$stateParams_.routename;

    var self = this;
    $scope.$watch(function() {
        return self.form.$dirty
    }, function(newVal) {
        if (newVal) {
            // once the user has changed something, it's considered unsaved changes
            unsavedChanges.blogs = true;
        }
    });
}

EditBlogsController.prototype.setUnsavedChanges = function(isChanged) {
    // If the update is successful consider there to be no unsaved changes
    this.unsavedChanges_.blogs = isChanged;
    var changeFormState = isChanged ? this.form.$setDrity : this.form.$setPristine;
    changeFormState();
};

EditBlogsController.prototype.createBlog = function() {
    var self = this;
    if(this.currentBlog.title ==''){
        this.currentBlog.title = 'Untitled';
    }
    return this.Blog_.create({
        title: this.currentBlog.title,
        text: this.currentBlog.text
    }, {
        basePath: this.apiEndpoint_ + '/users/' + this.$stateParams_.username + '/routes/' +
            this.$stateParams_.routename
    }).then(function(res) {
        //all changes should be saved at this point
        self.setUnsavedChanges(false);

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

EditBlogsController.prototype.showNewBlog = function() {
    var self = this;

    return self.$state_.go('blogs.edit', {
        username: self.$stateParams_.username,
        routename: self.$stateParams_.routename,
        blogid: 'newBlog'
    });
};

EditBlogsController.prototype.updateBlog = function() {
    var self = this;
    // If he blog doesn't exist yet, creat it instead
    if (this.$stateParams_.blogid === 'newBlog') {
        this.createBlog();
    } else {
        this.Blog_.update(this.$stateParams_.blogid, {
            title: this.currentBlog.title,
            text: this.currentBlog.text
        }, {
            basePath: this.apiEndpoint_
        }).then(function() {
            //all changes should be saved at this point
            self.setUnsavedChanges(false);
            self.$mdToast_.show(
                self.$mdToast_.simple()
                .textContent('Blog updated!')
                .position('top right')
                .hideDelay(3000)
            );
        })
    }
};

EditBlogsController.prototype.deleteBlog = function() {
    var self = this;
    this.Blog_.destroy(this.$stateParams_.blogid, {
        basePath: this.apiEndpoint_
    }).then(function() {
        self.$state_.go('blogs.edit', {
            username: self.$stateParams_.username,
            routename: self.$stateParams_.routename,
            blogid: 'newBlog'
        });
        self.$mdToast_.show(
            self.$mdToast_.simple()
            .textContent('Blog deleted!')
            .position('top right')
            .hideDelay(3000)
        );
    })
};

module.exports = EditBlogsController;
