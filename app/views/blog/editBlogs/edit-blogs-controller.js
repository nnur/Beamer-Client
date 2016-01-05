var EditBlogsController = function($state, $stateParams, $mdToast, Blog, apiEndpoint) {
    this.currentBlog = Blog.get($stateParams.blogid);
    this.Blog_ = Blog;
    this.$stateParams_ = $stateParams;
    this.$state_ = $state;
    this.$mdToast_ = $mdToast;
    this.apiEndpoint_ = apiEndpoint;
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

};

EditBlogsController.prototype.deleteBlog = function() {

};
module.exports = EditBlogsController;
