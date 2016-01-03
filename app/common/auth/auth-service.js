var auth = function($http, session, $q) {

    var root = 'http://localhost:1337';

    // Checks session expiry. Returns boolean
    this.isAuthenticated = function() {
        return session.isValid();
    };

    // Creates a new user at /signup and a new session with returned token.
    // Returns a promise.
    this.createNewUser = function(user) {
        var promise = $http({
            method: 'POST',
            url: root + '/users/signup',
            data: user
        }).then(function(res) {
            var data = res.data.data;
            if (data.token) {
                session.create({
                    token: data.token,
                    user: data.user
                });
            }
            return data;
        });
        return promise;
    };

    // Posts user to /login and creates a session if 
    //         server responds with a token. Returns a promise.
    this.loginUser = function(user) {

        var promise = $http({
            method: 'POST',
            url: root + '/users/login',
            data: user
        }).then(function(res) {
            console.log(res);
            var data = res.data.data;
            if (data.token) {

                session.create({
                    token: data.token,
                    user: data.user
                });
            }
            return data;
        });
        return promise;
    };

    // Destroys the session
    this.logoutUser = function() {
        session.destroy();
    };
};

module.exports = auth;
