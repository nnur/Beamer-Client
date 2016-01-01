/**
 * Login Controller handles login and signup forms
 */
module.exports = function($scope, auth, $mdDialog, User, session) {
    // Grab the current user from the data store to get it's attrs
    var currentUser = User.get(session.getUsername());
    $scope.username = currentUser.username;
    $scope.email = currentUser.email;

    $scope.logoutUser = function() {
        $mdDialog.hide();
        auth.logoutUser();
        $scope.$emit('userLogoutSuccess');
    }
}
