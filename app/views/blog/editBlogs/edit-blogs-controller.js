var EditBlogsController = function($stateParams, Blog) {
    this.currentBlog = Blog.get($stateParams.blogid);
}

module.exports = EditBlogsController;
