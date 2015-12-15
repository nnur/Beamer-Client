var router = function($routeProvider) {
    $routeProvider

        .when('/edit', {
            templateUrl: 'views/edit/edit-view.html',
            controller: 'EditController'
        })
        .when('/profile/:username', {
            templateUrl: 'views/profile/profile-view.html',
            controller: 'ProfileController'
        })
        .when('/', {
            templateUrl: 'views/landing/landing-view.html',
        });
};

module.exports = router;
