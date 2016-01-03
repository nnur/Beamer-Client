var logoutModalService = require('./logout-modal-service.js');

module.exports = angular.module('beamer.common.logoutModal', [])
    .service('logoutModal', ['$mdDialog', 'session', logoutModalService]);
