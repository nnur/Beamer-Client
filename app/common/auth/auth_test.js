describe('auth service', function() {

    var auth, jwtHelper, $httpBackend, mockSession, $window;
    var deferred, promise, authRequestHandler;
    var root = 'http://localhost:1337';


    beforeEach(function() {
        angular.mock.module('beamer.common.auth');
    });

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('session', function() {
                this.isValid = jasmine.createSpy('session.isValid');
                this.destroy = jasmine.createSpy('session.destroy');
                this.create = jasmine.createSpy('session.create');
            });
        });

    });

    beforeEach(function() {
        inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    beforeEach(
        inject(function(_auth_, _session_, $q, _$window_) {
            auth = _auth_;
            mockSession = _session_;
            $window = _$window_;
            $window.sessionStorage = {
                token: 'someToken'
            };
            //handling promises
            deferred = $q.defer();
        }));



    it('should check if session is valid and return the result',
        function() {
            auth.isAuthenticated();
            expect(mockSession.isValid).toHaveBeenCalled();
        });

    it('should logout the user by destroying their session',
        function() {
            auth.logoutUser();
            expect(mockSession.destroy).toHaveBeenCalled();
        });
    /** createNewUser */
    it('should send a post to /signup and receive a promise',
        function() {
            var user = 'testUser';
            var res = {
                data: {
                    token: 'testToken'
                }
            };

            $httpBackend.expectPOST(root + '/users/signup', user)
                .respond(res);
            auth.createNewUser(user);
            //TODO
            // expect(mockSession.create).toHaveBeenCalled();
            $httpBackend.flush();
        });

    it('should send a post to /login and receive a promise',
        function() {
            var user = 'testUser';
            $httpBackend.expectPOST(root + '/users/login', user).respond({
                data: 'testData'
            });
            auth.loginUser(user);
            $httpBackend.flush();
        });
});
