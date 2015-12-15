var auth = require('./auth-service');

module.exports = angular.module('beamer.common.auth', ['beamer.common.session'])
    .service('auth', ['$http', 'session', '$q', auth]);
