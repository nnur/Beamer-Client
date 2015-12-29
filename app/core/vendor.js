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
    require('angular-aria');
    require('angular-animate');
    require('angular-material');
    require('angular-jwt');
    require('js-data');
    require('js-data-angular');
    require('js-data-http');
    require('ng-smooth-scroll');
};
