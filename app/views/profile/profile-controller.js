var ProfileController = function($scope, user, $mdSidenav, auth, $mdDialog) {
    this.$scope_ = $scope;
    this.auth_ = auth;
    this.User_ = user;
    this.user = {
        username: user.username,
        email: user.email,
        initial: user.username.charAt(0),
        routes: user.routes
    };
    this.goldenUser = angular.copy(this.user);
    this.$mdSidenav_ = $mdSidenav;
    this.$mdDialog_ = $mdDialog;
    this.isEditMode = false;
};


ProfileController.prototype.openUserMenu = function($mdOpenMenu) {
    // Do not allow user to toggle sidenav in desktop
    if (!this.$mdSidenav_('left').isLockedOpen()) {
        this.$mdSidenav_('left').toggle();
    } else {
        $mdOpenMenu();
    }
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
        self.logoutUser();
    });
};

ProfileController.prototype.logoutUser = function() {
    this.auth_.logoutUser();
    this.$scope_.$emit('userLogoutSuccess');
};


ProfileController.prototype.saveUserData = function() {
    var self = this;
    this.isEditMode = false;
    // If it hasn't changed, do nothing
    if (this.User_.email === this.user.email) return;
    this.User_.email = this.user.email;
    // users/dharness/
    this.User_.DSSave().then(function(user) {
        self.goldenUser = angular.copy(self.user);
    }).catch(function(err) {
        self.updateError = 'Invalid email. Email not set.';
        self.user.email = self.goldenUser.email;
        self.User_.email = self.goldenUser.email;
    });
};

module.exports = ProfileController;
