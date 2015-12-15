var beamer = require('./beamer');


var app = angular.module('beamer', [
    'ngRoute',
    'smoothScroll',
    'angular-jwt',
    beamer.common.routeListItem.module.name,
    beamer.common.session.module.name,
    beamer.common.auth.module.name,
    beamer.common.login.module.name,
    beamer.views.profile.module.name
]);

// 'beamer.views.edit', 'beamer.views.profile',
// 'beamer.common.login', 'beamer.common.auth', 'beamer.common.session',
// 'beamer.common.sidebar', 'beamer.common.routeListItem', 'ngFileUpload',
// 'ngResource', 'ngRoute', 'angular-jwt', 'smoothScroll', 'js-data'

// CONFIGURATION
app.config(beamer.config.router);

module.exports = app;
