var mainController = require('./main-controller');

module.exports = angular.module('beamer.main', [])
    .controller('MainController', ['$scope', mainController]);
