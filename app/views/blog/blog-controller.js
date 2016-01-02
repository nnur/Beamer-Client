var BlogController = function(User, session, currentUser, blogs) {
    this.currentUser = User.get(session.getUsername());
    this.blogs = blogs;
    console.log(blogs);
};

module.exports = BlogController;
