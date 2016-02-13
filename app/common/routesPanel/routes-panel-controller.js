var RoutesPanelCtrl = function($scope, $state, session, DS, DSHttpAdapter, apiEndpoint, User, Route, $mdToast, $mdSidenav, $mdDialog, auth, logoutModal, editRouteModal) {
    // Private
    this.auth_ = auth;
    this.$scope_ = $scope;
    this.$state_ = $state;
    this.DS_ = DS;
    this.DSHttpAdapter_ = DSHttpAdapter;
    this.apiEndpoint_ = apiEndpoint;
    this.Route_ = Route;
    this.User_ = User;
    this.$mdSidenav_ = $mdSidenav;
    this.$mdToast_ = $mdToast;
    this.$mdDialog_ = $mdDialog;

    // Public
    this.currentUser = User.get(session.getUsername());
    this.editMode = {};
    this.newRoute = "";
    this.logoutModal = logoutModal;
    this.editRouteModal = editRouteModal;
};

/**
 * Utility function to display a toast in the upper right hand corner
 * @param  {string} text - the message to show on the toast
 * @param  {object} options - in case of the need for customization in the future
 */
RoutesPanelCtrl.prototype.showToast = function(text, options) {
    this.$mdToast_.show(
        this.$mdToast_.simple()
        .textContent(text)
        .position('top right')
        .hideDelay(3000)
    );
};

RoutesPanelCtrl.prototype.goToBlogsView = function(routename) {
    this.$state_.go('blogs.edit', {
        username: this.currentUser.username,
        routename: routename,
        blogid: 'newBlog'
    });
};

RoutesPanelCtrl.prototype.openUserMenu = function($mdOpenMenu) {
    // Do not allow user to toggle sidenav in desktop
    if (!this.$mdSidenav_('left').isLockedOpen()) {
        this.$mdSidenav_('left').toggle();
    } else {
        $mdOpenMenu();
    }
};

RoutesPanelCtrl.prototype.addRoute = function() {
    var self = this;
    this.newRoute = this.newRoute //.replace(/[^a-zA-Z ]/g, "");
    var newRoute = {
        routename: this.newRoute
    };
    this.DSHttpAdapter_.create(this.Route_, newRoute, {
        basePath: this.apiEndpoint_ + '/users/' + self.currentUser.username + '/'
    }).then(function(route) {
        var username = self.$scope_.currentUser.username;
        return self.User_.refresh(username);
    }).then(function(refreshedUser) {
        //updates computed properties
        refreshedUser.DSCompute();
        // By this point, the route has been
        // added and the user is in sync
        self.newRoute = "";
    }).catch(function(err) {
        self.showToast(err.statusText + ', route not added')
        self.newRoute = "";
    });
};

RoutesPanelCtrl.prototype.deleteRoute = function(routename) {
    var self = this;

    this.DSHttpAdapter_.destroy(this.Route_, routename, {
        basePath: this.apiEndpoint_
    }).then(function(route) {
        var username = self.$scope_.currentUser.username;
        return self.Route_.eject(routename);
    }).then(function() {
        self.$scope_.currentUser.DSCompute();
    }).catch(function(err) {
        self.showToast(err.statusText + ', route not deleted');
    });
};

/**
 * Called on successful copy of route to the clipboard
 */
RoutesPanelCtrl.prototype.copySuccess = function() {
    this.showToast('Route coppied!');
};

/*
 * Called on successful copy of route to the clipboard
 */
RoutesPanelCtrl.prototype.copyFail = function(err) {
    this.showToast('Route not coppied, ' + err);
};

module.exports = RoutesPanelCtrl;
