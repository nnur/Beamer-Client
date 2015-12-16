var session = function(jwtHelper) {

    this.getToken = function() {
        if (_.isUndefined(this.token)) {
            this.token = sessionStorage.token;
        }
        return this.token;
    };

    // Extracts token information and saves it in the session
    this.create = function(token) {
        this.expDate = jwtHelper.getTokenExpirationDate(token);
        // this.userid = jwtHelper.decodeToken(token).id;
        this.userid = '566135093d2411aff5c123e8';
        this.token = token;
        sessionStorage.token = token;
    };

    // Sets session attributes to null
    this.destroy = function() {
        this.expDate = null;
        this.userid = null;
        this.token = null;
    };

    // Checks if token is expired and returns the result
    this.isValid = function() {
        if (this.token) {
            return !jwtHelper.isTokenExpired(this.token);
        } else {
            return false;
        }
    };
};

module.exports = session;
