var session = require('./session-service');

module.exports = angular.module('beamer.common.session', ['angular-jwt'])
    .service('session', ['jwtHelper', session]);
