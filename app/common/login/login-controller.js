/**
 * Login Controller handles login and signup forms
 */
module.exports = function LoginController($scope, $state, auth, $location, $mdToast) {
    $scope.showButt = true;
    $scope.login = {};
    $scope.signup = {};
    // Creates user obj with form info and sends it off for authentication.
    $scope.signup = function() {
        var user = {
            username: $scope.user.username,
            email: $scope.user.newEmail,
            password: $scope.user.pwd1
        };

        //when a user signs in, it is automatically logged in
        auth.createNewUser(user)
            .then(loginSuccess, signupErr);
    };

    // Authenticates user credentials.
    $scope.login = function() {
        var user = {
            email: $scope.user.email,
            password: $scope.user.pwd
        };
        auth.loginUser(user)
            .then(loginSuccess, loginError);
    };

    // This parses the error and adds it to the scope to be shown
    function signupErr(res) {

        var errorObj = res.data.err;
        var errors = Object.keys(errorObj.invalidAttributes);
        var length = errors.length;

        for (var i = 0; i < length; i++) {
            if (errors[i] == 'email') {
                $scope.signup.error = 'That email already exists!'
            } else if (errors[i] == 'username') {
                $scope.signup.error = 'That username already exists!'
            }
        }
    }

    // Adds the login error to the scope to be shown
    function loginError(res) {
        if (res.data.err) {
            $scope.login.error = res.data.err;
        } else if (res.status == 422) {
            $scope.login.error = 'Invalid credentials!';
        }
    }

    // A successful login routes view to profile
    function loginSuccess(res) {
        $state.go('users.routes', {
            username: res.user.username
        });
    }
};
