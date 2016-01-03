var confrimDeleteModalService = require('./confirm-delete-modal-service.js');

module.exports = angular.module('beamer.common.confrimDeleteModal', [])
    .service('confirmDeleteModal', ['$mdDialog', 'User', 'session', confrimDeleteModalService]);
