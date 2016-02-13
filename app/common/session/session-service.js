var _ = require('lodash');

var session = function($window, jwtHelper) {

    this.getUsername = function() {
        return $window.sessionStorage.username;
    };

    /**
     * Never access the token property directly, always use this method
     */
    this.getToken = function() {
        if (_.isUndefined(this.token)) {
            this.token = $window.sessionStorage.token;
        }
        return this.token;
    };

    this.setToken = function(token) {
        this.token = token;
        $window.sessionStorage.token = token;
    }

    // Extracts token information and saves it in the session
    this.create = function(data) {
        this.expDate = jwtHelper.getTokenExpirationDate(data.token);
        this.userid = jwtHelper.decodeToken(data.token).id;
        $window.sessionStorage.username = data.user.username;
        this.setToken(data.token);
    };

    // Sets session attributes to null
    this.destroy = function() {
        this.expDate = null;
        this.userid = null;
        this.token = null;
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.username;
    };

    // Checks if token is expired and returns the result
    this.isValid = function() {
        if (this.getToken()) {
            return !jwtHelper.isTokenExpired(this.getToken());
        } else {
            return false;
        }
    };
};

module.exports = session;
