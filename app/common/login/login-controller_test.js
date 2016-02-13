describe('LoginController', function() {

    var auth, deferred, controller, $scope, rootScope;

    beforeEach(function() {
        angular.mock.module('beamer.common.login');
    });

    beforeEach(function() {
        angular.mock.module(function($provide) {
            jwtHelper = {};
            $provide.value('jwtHelper', jwtHelper);
            $provide.value('currentUser', {});
            $provide.value('$state', {
                go: jasmine.createSpy('$state.go')
            });
            $provide.value('$mdToast', {});
            $provide.value('$mdSidenav', {});
            $provide.value('$mdDialog', {});
            $provide.value('User', {});
            $provide.value('logoutModal', {});
            $provide.value('confirmDeleteModal', {});
        });
    });

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('auth', function() {
                this.createNewUser = function() {
                    return {
                        then: jasmine.createSpy('createNewUser.then')
                    };
                };
            });
        });
    });

    beforeEach(inject(function(_$controller_, _auth_, $rootScope, $q) {
        $scope = {};
        $controller = _$controller_;
        controller = $controller('LoginController', {
            $scope: $scope
        });
        rootScope = $rootScope;
        deferred = $q.defer();
        auth = _auth_;
    }));


    describe('$scope.signup', function() {

        it("should call auth.createNewUser and the returned promise", function() {
            var resolvedValue;
            var promise = deferred.promise;
            promise.then(function(value) {
                resolvedValue = value;
            });

            $scope.user = {
                username: 'testUsername',
                newEmail: 'testEmail',
                pwd: 'testPwd'
            };

            spyOn(auth, 'createNewUser').and.returnValue(promise);
            $scope.signup();
            expect(auth.createNewUser).toHaveBeenCalled();

            deferred.resolve({
                user: {
                    username: 'testUsername'
                }
            });
            expect(resolvedValue).toBeUndefined();
            rootScope.$apply();
            expect(resolvedValue).toEqual({
                user: {
                    username: 'testUsername'
                }
            });
        });

    });
});
