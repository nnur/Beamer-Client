var templateUrl = require('ngtemplate!html!./login-directive.html');

module.exports = function loginDirective() {
    return {
        templateUrl: templateUrl,
        controller: 'LoginController'
    };
};
