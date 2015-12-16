var sidebar = require('./sidebar-directive');

module.exports = angular.module('beamer.common.sidebar', [])
    .directive('sideBar', sidebar);
