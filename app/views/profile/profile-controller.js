var ProfileController = function($scope, user, $mdSidenav, auth) {
    this.$scope_ = $scope;
    this.auth_ = auth;
    this.User_ = user;
    this.goldenUser = angular.copy(this.user);
    this.$mdSidenav_ = $mdSidenav;
    this.isEditMode = false;
    this.user = {
        username: user.username,
        email: user.email,
        initial: user.username.charAt(0)
    };
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
        // When we click edit, the error message can dissapear
        this.updateError = false;
        // Wait for interpolation to happen so input is editable
        setTimeout(function() {
            $('#email').focus();
            $('#email').click()
        }, 25);
    }

};

ProfileController.prototype.deleteUser = function() {
    //TODO: alert warning
    var self = this;
    this.User_.DSDestroy().then(function(destroyedUser) {
        self.auth_.logoutUser();
        self.$scope_.$emit('userLogoutSuccess');
    });
};

ProfileController.prototype.saveUserData = function() {
    var self = this;
    this.isEditMode = false;
    // If it hasn't changed, do nothing
    if (this.User_.email === this.user.email) return;
    this.User_.email = this.user.email;
    // users/dharness/
    this.User_.DSSave().catch(function(err) {
        self.updateError = 'Invalid email. Email not set.';
        self.user.email = self.goldenUser.email;
        self.User_.email = self.goldenUser.email;
    });
};

module.exports = ProfileController;
