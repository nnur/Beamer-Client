var EditRouteDialogueController = function($mdDialog, routename) {
    this.$mdDialog_ = $mdDialog;
    this.routename = routename;
};

EditRouteDialogueController.prototype.updateRouteName = function() {
    alert('rooty');
    console.log('po');
};

EditRouteDialogueController.prototype.cancelEditMode = function() {
    this.$mdDialog_.hide();
};

module.exports = EditRouteDialogueController;
