require('./vendor.js')();
var app = require('../app-module');

angular.element(document).ready(function() {
    angular.bootstrap(document, [app.name], {});
});
