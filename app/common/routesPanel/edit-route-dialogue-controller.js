var EditRouteDialogueController = function($mdDialog, apiEndpoint, routename,
    currentUser, DSHttpAdapter, Route, User) {
    //public
    this.routename = routename;
    this.currentUser_ = currentUser;
    this.oldRouteName = routename;
    //private
    this.apiEndpoint_ = apiEndpoint;
    this.$mdDialog_ = $mdDialog;
    this.DSHttpAdapter_ = DSHttpAdapter;
    this.Route_ = Route;
    this.User_ = User;
};

EditRouteDialogueController.prototype.updateRouteName = function() {
    var self = this;
    var routename = this.routename;
    var changedRoute = {
        routename: routename.replace(/\//g, '')
    }
    this.DSHttpAdapter_.update(this.Route_, this.oldRouteName, changedRoute, {
        basePath: this.apiEndpoint_ + '/users/dharness/'
    }).then(function(updatedRoute) {
        console.log(updatedRoute);
        return self.User_.refresh(self.currentUser_.username);
    }).then(function(user) {

        console.log(user);
        self.oldRouteName = self.routename;
        self.$mdDialog_.hide();
    }).catch(function(err) {
        self.routename = self.oldRouteName;
    });
}
EditRouteDialogueController.prototype.cancelEditMode = function() {
    this.$mdDialog_.hide();
};

module.exports = EditRouteDialogueController;
