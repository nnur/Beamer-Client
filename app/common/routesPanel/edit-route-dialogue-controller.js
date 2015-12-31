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
        // this.Route_.update(this.oldRouteName, changedRoute).then(function(updatedRoute) {
        //         return self.User_.loadRelations(self.currentUser_.username, ['routes']);
        //     }).then(function(user) {
        //         console.log(user);
        //     })
    this.DSHttpAdapter_.update(this.Route_, this.oldRouteName, changedRoute, {
        basePath: this.apiEndpoint_ + '/users/dharness/'
    }).then(function(updatedRoute) {
        return self.User_.refresh();
    }).then(function(user) {
        console.log(user);

    });

    // }).then(function(refreshedUser) {
    //     // By this point, the route has been 
    //     // updated and the user is in sync
    //     self.oldRouteName = self.routename;
    //     self.$mdDialog_.hide();
    // }).catch(function(err) {
    //     self.routename = self.oldRouteName;


}
EditRouteDialogueController.prototype.cancelEditMode = function() {
    this.$mdDialog_.hide();
};

module.exports = EditRouteDialogueController;
