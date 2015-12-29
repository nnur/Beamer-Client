var RoutesPanelCtrl = function($scope, DS, DSHttpAdapter, apiEndpoint, User, Route, $mdToast) {
    this.newRoute = "";
    this.$scope_ = $scope;
    this.DS_ = DS;
    this.DSHttpAdapter_ = DSHttpAdapter;
    this.apiEndpoint_ = apiEndpoint;
    this.Route_ = Route;
    this.textToCopy = "dillydoo";
    this.$mdToast_ = $mdToast;
};

RoutesPanelCtrl.prototype.addRoute = function() {
    this.newRoute = this.newRoute.replace(/\s+/g, '');
    var newRoute = {
        routename: this.newRoute
    }

    var self = this;

    this.DSHttpAdapter_.create(this.Route_, newRoute, {
        basePath: this.apiEndpoint_ + '/users/dharness/'
    }).then(function(route) {
        self.$scope_.user.routes.push(route.data);
    }).catch(function(err) {
        console.log(err);
    });
    this.newRoute = "";
};

/**
 * Called on successful copy of route to the clipboard
 */
RoutesPanelCtrl.prototype.copySuccess = function() {
    this.$mdToast_.show(
        this.$mdToast_.simple()
        .textContent('Route coppied!')
        .position('top right')
        .hideDelay(3000)
    );
};

/*
 * Called on successful copy of route to the clipboard
 * TODO: add a prettier err message here
 */
RoutesPanelCtrl.prototype.copyFail = function(err) {
    this.$mdToast_.show(
        this.$mdToast_.simple()
        .textContent('Route not coppied, ' + err)
        .position('top right')
        .hideDelay(3000)
    );
};

module.exports = RoutesPanelCtrl;
