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
    // can't require textAngular without causing this https://github.com/webpack/webpack/issues/959
    var $script = require("scriptjs");
    $script("http://textangular.com/dist/textAngular-rangy.min.js", function() {
        $script("http://textangular.com/dist/textAngular-sanitize.min.js", function() {
            $script("http://textangular.com/dist/textAngular.min.js", function() {
                resolve();
            });
        });
    });
});
