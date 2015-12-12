module.exports = function($routeProvider) {
    $routeProvider
        .when('/edit', {
            template: 'lemmons piss blood'
        }).when('/', {
            templateUrl: '../views/main-view.html',
            controller: 'MainController'
        });
};
