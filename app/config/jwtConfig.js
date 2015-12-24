var jwtConfig = function(jwtInterceptorProvider, $httpProvider) {
    // Send a jwt on all http requests
    jwtInterceptorProvider.tokenGetter = ['session',
        function(session) {
            return session.getToken();
        }
    ];

    $httpProvider.interceptors.push('jwtInterceptor');
}

module.exports = jwtConfig;
