var ProfileController = function($scope, currentUser, $mdSidenav, auth, $mdDialog, User, logoutModal, confirmDeleteModal) {
    // Private
    this.$scope_ = $scope;
    this.auth_ = auth;
    this.$mdSidenav_ = $mdSidenav;
    this.$mdDialog_ = $mdDialog;

    // Public
    this.currentUser = currentUser;
    this.goldenUser = angular.copy(this.currentUser);
    this.isEditMode = false;
    this.logoutModal = logoutModal;
    this.confirmDeleteModal = confirmDeleteModal;
};

ProfileController.prototype.openUserMenu = function($mdOpenMenu) {
    // Do not allow user to toggle sidenav in desktop
    if (!this.$mdSidenav_('left').isLockedOpen()) {
        this.$mdSidenav_('left').toggle();
    } else {
        $mdOpenMenu();
    }
};

/**
 * Toggles if a User's Username is editable
 */
ProfileController.prototype.toggleEditMode = function() {
    // This branch is clicking cancel
    if (this.isEditMode) {
        this.currentUser.email = this.goldenUser.email;
        this.currentUser.username = this.goldenUser.username;
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

ProfileController.prototype.saveUserData = function() {
    var self = this;
    this.isEditMode = false;
    // If it hasn't changed, do nothing
    if (this.currentUser.email === this.goldenUser.email) return;
    // this.currentUser.email = this.user.email;
    // users/dharness/
    this.currentUser.DSSave().then(function(user) {
        self.goldenUser = angular.copy(self.currentUser);
    }).catch(function(err) {
        self.updateError = 'Invalid email. Email not set.';
        self.currentUser.email = self.goldenUser.email;
    });
};



module.exports = ProfileController;
