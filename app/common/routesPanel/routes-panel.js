var routesPanel = require('./routes-panel-directive.js');

module.exports = angular.module('beamer.common.routesPanel', ['angular-clipboard'])
    .directive('routesPanel', [routesPanel]);
