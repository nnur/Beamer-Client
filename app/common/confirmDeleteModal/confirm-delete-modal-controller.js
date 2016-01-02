var ConfirmDeleteModalController = function($scope, $mdDialog, User, session, auth) {
    // Private
    this.$mdDialog_ = $mdDialog;
    this.$scope_ = $scope;
    this.auth_ = auth;

    this.currentUser = User.get(session.getUsername());
};

ConfirmDeleteModalController.prototype.cancelDelete = function() { 
    this.$mdDialog_.hide();
};

ConfirmDeleteModalController.prototype.deleteAccount = function() {
    var self = this;
    this.currentUser.DSDestroy().then(function(destroyedUser) {
        self.$mdDialog_.hide();
        self.auth_.logoutUser();
        self.$scope_.$emit('userLogoutSuccess');
    });
};

module.exports = ConfirmDeleteModalController;
