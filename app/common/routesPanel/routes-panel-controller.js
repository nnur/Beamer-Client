var RoutesPanelCtrl = function($scope, DS, DSHttpAdapter, apiEndpoint, User, Route) {
    this.newRoute = "";
    this.$scope_ = $scope;
    this.DS_ = DS;
    this.DSHttpAdapter_ = DSHttpAdapter;
    this.apiEndpoint_ = apiEndpoint;
    this.Route_ = Route;
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
module.exports = RoutesPanelCtrl;
