var beamer = require('./beamer');

var app = angular.module('beamer', [
    'ngRoute',
    'ui.router',
    'ngMaterial',
    'smoothScroll',
    'vs-repeat',
    'angular-jwt',
    'js-data',
    'textAngular',
    beamer.common.auth.module.name,
    beamer.common.login.module.name,
    beamer.common.routesPanel.module.name,
    beamer.common.session.module.name,
    beamer.common.sidebar.module.name,
    beamer.common.logoutModal.module.name,
    beamer.common.editRouteModal.module.name,
    beamer.common.confirmDeleteModal.module.name,
    beamer.common.searchBlogsList.module.name,
    beamer.common.models.module.name,
    beamer.views.profile.module.name,
    beamer.views.blog.module.name,
    beamer.views.blog.editBlogs.module.name,
]);

app.constant('apiEndpoint', 'http://127.0.0.1:1337/');
app.constant('unprotected', [
    '/', // for the base angular route, <url>:<port>/#/
    '' // for the empty route, <url>:<port>
]);

// CONFIGURATION
app.config(beamer.config.jwt);
app.config(beamer.config.router);
app.config(beamer.config.textAnguarBtns);

// RUN
app.run(beamer.config.routeAccess);
app.run(beamer.config.ds);

module.exports = app;
