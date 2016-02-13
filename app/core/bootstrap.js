var promise = require('./vendor.js');
promise.then(function() {

    var app = require('../app-module');

    angular.element(document).ready(function() {
        angular.bootstrap(document, [app.name], {});
    });

});
