var ProfileController = function($scope, $http, user, $mdSidenav) {
    console.log('IN PROFILE CONTROLLER', user);
    this.user = {
        username: user.username,
        email: user.email
    };
    this.$mdSidenav_ = $mdSidenav;
};


ProfileController.prototype.toggleList = function() {
    this.$mdSidenav_('left').toggle();
}

module.exports = ProfileController;
