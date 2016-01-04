/**
 * @file Requires all third-party libraries and stlyes.
 * @author Naila Nur
 */
module.exports = new Promise(function(resolve, reject) {
    /* JS */
    require('../views/landing/js/agency');
    require('../views/landing/js/cbpAnimatedHeader');

    /* Styles */
    require('../styles/importer.scss');

    /* Angular */
    require('angular');
    require('angular-route');
    require('angular-ui-router');
    require('angular-aria');
    require('angular-animate');
    require('angular-material');
    require('angular-vs-repeat');
    require('angular-jwt');
    require('angular-clipboard');
    require('js-data');
    require('js-data-angular');
    require('js-data-http');
    require('ng-smooth-scroll');

    // TODO: this no longer needs to be a promise
    require('imports?define=>false!rangy');
    require('imports?define=>false!textangular/dist/textAngular-sanitize.min.js');
    require('imports?define=>false!textangular/dist/textAngular.min.js');
    resolve();

});
