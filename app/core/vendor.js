/**
 * @file Requires all third-party libraries and stlyes.
 * @author Naila Nur
 */
module.exports = function() {
    /* JS */
    require('../views/landing/js/agency');
    require('../views/landing/js/cbpAnimatedHeader');

    /* Styles */
    require('../styles/importer.scss');

    /* Angular */
    require('angular');
    require('angular-route');
    require('ng-smooth-scroll');
    require('angular-jwt');
};
