var saveChangesModalService = require('./save-changes-modal-service.js');

module.exports = angular.module('beamer.common.saveChangesModal', [])
    .service('saveChangesModal', ['$mdDialog', 'User', 'session', saveChangesModalService]);
