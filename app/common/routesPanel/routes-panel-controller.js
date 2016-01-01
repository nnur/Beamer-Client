var RoutesPanelCtrl = function($scope, DS, DSHttpAdapter, apiEndpoint, User, Route, $mdToast, $mdSidenav, $mdDialog, auth, logoutModal, editRouteModal) {
    // Private
    this.auth_ = auth;
    this.$scope_ = $scope;
    this.DS_ = DS;
    this.DSHttpAdapter_ = DSHttpAdapter;
    this.apiEndpoint_ = apiEndpoint;
    this.Route_ = Route;
    this.User_ = User;
    this.$mdSidenav_ = $mdSidenav;
    this.$mdToast_ = $mdToast;
    this.$mdDialog_ = $mdDialog;

    // Public
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

RoutesPanelCtrl.prototype.openUserMenu = function($mdOpenMenu) {
    // Do not allow user to toggle sidenav in desktop
    if (!this.$mdSidenav_('left').isLockedOpen()) {
        this.$mdSidenav_('left').toggle();
    } else {
        $mdOpenMenu();
    }
};

RoutesPanelCtrl.prototype.toggleEditMode = function(route) {
    var self = this;

    this.$mdDialog_.show({
        templateUrl: './common/routesPanel/edit-route-dialogue.html',
        parent: angular.element(document.body),
        controller: require('./edit-route-dialogue-controller.js'),
        controllerAs: 'editRouteDialgoueCtrl',
        locals: {
            routename: '/' + route.routename,
            currentUser: self.$scope_.currentUser
        },
        clickOutsideToClose: true,
    });
};

RoutesPanelCtrl.prototype.addRoute = function() {
    var self = this;
    this.newRoute = this.newRoute.replace(/\s+/g, '');
    var newRoute = {
        routename: this.newRoute
    };
    this.DSHttpAdapter_.create(this.Route_, newRoute, {
        basePath: this.apiEndpoint_ + '/users/dharness/'
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
