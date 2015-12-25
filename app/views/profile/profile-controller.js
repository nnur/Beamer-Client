var ProfileController = function($scope, $http, user, $mdSidenav) {
    console.log('IN PROFILE CONTROLLER', user);
    this.User_ = user;
    this.user = {
        username: user.username,
        email: user.email,
        initial: user.username.charAt(0)
    };
    this.goldenUser = angular.copy(this.user);
    this.$mdSidenav_ = $mdSidenav;
    this.isEditMode = false;
    this.editOrCancel = 'Edit';
};

ProfileController.prototype.toggleList = function() {
    this.$mdSidenav_('left').toggle();
};


ProfileController.prototype.toggleEditMode = function() {

    // This branch is clicking cancel
    if (this.isEditMode) {
        this.user.email = this.goldenUser.email;
        this.user.username = this.goldenUser.username;

        this.isEditMode = false;
    } else {
        // This branch is clicking edit
        this.isEditMode = true;
        // Wait for interpolation to happen so input is editable
        setTimeout(function() {
            $('#email').focus();
            $('#email').click()
        }, 25);
    }

};

ProfileController.prototype.deleteUser = function() {
    console.log('sdfsdfdsf');
    this.User_.DSDestroy().catch(function(err) {
        console.log(err);
    });
};

ProfileController.prototype.saveUserData = function() {
    this.isEditMode = false;
    // If it hasn't changed, do nothing
    if (this.User_.email === this.user.email) return;
    this.User_.email = this.user.email;
    // users/dharness/
    this.User_.DSSave();
};


module.exports = ProfileController;
