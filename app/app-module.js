var beamer = require('./beamer');


var app = angular.module('beamer', [
    'ngRoute',
    'smoothScroll',
    'angular-jwt',
    'js-data',
    beamer.common.auth.module.name,
    beamer.common.login.module.name,
    beamer.common.routeListItem.module.name,
    beamer.common.session.module.name,
    beamer.common.sidebar.module.name,
    beamer.views.profile.module.name
]);

// 'beamer.views.edit', 'beamer.views.profile',
// 'beamer.common.login', 'beamer.common.auth', 'beamer.common.session',
// 'beamer.common.sidebar', 'beamer.common.routeListItem', 'ngFileUpload',
// 'ngResource', 'ngRoute', 'angular-jwt', 'smoothScroll', 'js-data'
// 

function jwtConfig(jwtInterceptorProvider) {
    // Send a jwt on all http requests
    jwtInterceptorProvider.tokenGetter = ['session',
        function(session) {
            return session.getToken();
        }
    ];
}

app.config(jwtConfig);

app.config(function($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('jwtInterceptor');
});


// TODO: look at normal beamer for differneces in run
app.run(function(DS, $rootScope) {

    DS.defineResource({
        name: 'users',
        idAttribute: 'username',
        basePath: 'http://127.0.0.1:1337/',
        // set just for this resource
        afterFind: function(resource, data, cb) {
            // do something more specific to "users"
            console.log(data);
            cb(null, data.data);
        }
    });
});

// CONFIGURATION
app.config(beamer.config.router);

module.exports = app;
