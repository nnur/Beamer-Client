var beamer = require('./beamer');


var app = angular.module('beamer', [
    'ngRoute',
    'smoothScroll',
    'angular-jwt',
    'ngMaterial',
    'js-data',
    beamer.common.auth.module.name,
    beamer.common.login.module.name,
    beamer.common.routeListItem.module.name,
    beamer.common.session.module.name,
    beamer.common.sidebar.module.name,
    beamer.views.profile.module.name
]);

app.constant('apiEndpoint', 'http://127.0.0.1:1337/');

function jwtConfig(jwtInterceptorProvider) {
    // Send a jwt on all http requests
    jwtInterceptorProvider.tokenGetter = ['session',
        function(session) {
            return session.getToken();
        }
    ];
}

// app.config(jwtConfig);

app.config(function($httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('jwtInterceptor');
});


// TODO: look at normal beamer for differneces in run
app.run(function(DS, $rootScope, apiEndpoint) {

    DS.defineResource({
        name: 'users',
        idAttribute: 'username',
        basePath: apiEndpoint,

        relations: {
            hasMany: {
                routes: [{
                    localField: 'routes',
                    foreignKey: 'username'
                }]
            }
        },
        // set just for this resource
        afterFind: function(resource, data, cb) {
            // do something more specific to "users"
            cb(null, data.data.user);
        }
    });

    DS.defineResource({
        name: 'routes',
        idAttribute: 'routename',
        basePath: apiEndpoint,
        cacheResponse: true,
        relations: {
            belongsTo: {
                users: {
                    parent: true,
                    localField: 'users',
                    localKey: 'username'
                }
            }
        },
        afterFindAll: function(resource, data, cb) {
            // do something more specific to "users"
            cb(null, data.data.routes);
        }
    });


});

// CONFIGURATION
app.config(beamer.config.router);

module.exports = app;
