var SaveChangesModalController = function($scope, $mdDialog, User, session, auth) {
    // Private
    this.$mdDialog_ = $mdDialog;
    this.$scope_ = $scope;
    this.auth_ = auth;

    this.currentUser = User.get(session.getUsername());
};

SaveChangesModalController.prototype.stay = function() { 
    this.$mdDialog_.cancel();
};

SaveChangesModalController.prototype.leave = function() {
    this.$mdDialog_.hide();
};

module.exports = SaveChangesModalController;
