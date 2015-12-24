var session = function($window, jwtHelper) {

    /**
     * Never access the token property directly, always use this method
     */
    this.getToken = function() {
        if (_.isUndefined(this.token)) {
            this.token = sessionStorage.token;
        }
        return this.token;
    };

    // Extracts token information and saves it in the session
    this.create = function(token) {
        this.expDate = jwtHelper.getTokenExpirationDate(token);
        this.userid = jwtHelper.decodeToken(token).id;
        this.token = token;
        $window.sessionStorage.token = token;
    };

    // Sets session attributes to null
    this.destroy = function() {
        this.expDate = null;
        this.userid = null;
        this.token = null;
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
