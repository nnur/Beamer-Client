// configs
var beamerRouteConfig = require('./config/router');
// modules
var mainModule = require('./views/main.js');

var app = angular.module('beamer', [
    'ngRoute',
    mainModule.name,

]);

// CONFIGURATION
app.config(beamerRouteConfig);

module.exports = app;
