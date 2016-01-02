var BlogController = function(User, session) {
    this.currentUser = User.get(session.getUsername());
    console.log(this.currentUser);
}

module.exports = BlogController;
