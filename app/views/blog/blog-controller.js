var BlogController = function($scope, User, session, currentUser, blogs) {
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

module.exports = BlogController;
