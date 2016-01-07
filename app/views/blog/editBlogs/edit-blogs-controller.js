var EditBlogsController = function($state, $stateParams, $mdToast, Blog, apiEndpoint, Route) {
    this.currentBlog = angular.copy(Blog.get($stateParams.blogid));
    this.Blog_ = Blog;
    this.Route_ = Route;
    this.$stateParams_ = $stateParams;
    this.$state_ = $state;
    this.$mdToast_ = $mdToast;
    this.apiEndpoint_ = apiEndpoint;
    this.basePath = this.apiEndpoint_ + '/users/' + this.$stateParams_.username + '/routes/' +
        this.$stateParams_.routename;
}

EditBlogsController.prototype.createBlog = function() {
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

EditBlogsController.prototype.updateBlog = function() {
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

EditBlogsController.prototype.deleteBlog = function() {
    var self = this;
    this.Blog_.destroy(this.$stateParams_.blogid, {
        basePath: 'http://127.0.0.1:1337/'
    }).then(function() {

        // self.$state_.go('blogs', {
        //     username: self.$stateParams_.username,
        //     routename: self.$stateParams_.routename
        // });
        self.$mdToast_.show(
            self.$mdToast_.simple()
            .textContent('Blog deleted!')
            .position('top right')
            .hideDelay(3000)
        );
    })
};

module.exports = EditBlogsController;
