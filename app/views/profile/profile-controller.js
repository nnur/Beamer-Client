var ProfileController = function($scope, $http, user) {
    console.log('IN PROFILE CONTROLLER', user);
    this.snapper_ = new Snap({
        element: document.getElementById('bm-profile-content'),
        drag: false
    });
};

ProfileController.prototype.toggleSidebar = function() {
    if (this.snapper_.state().state == "left") {
        this.snapper_.close();
    } else {
        this.snapper_.open('left');
    }
};

module.exports = ProfileController;
