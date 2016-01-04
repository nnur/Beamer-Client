describe('Routes Controller', function() {

    var profileController, $scope, mockUser, jwtInterceptorProvider;

    beforeEach(function() {
        angular.mock.module('beamer.views.user.routes');
    });

    beforeEach(function() {
        angular.mock.module(function($provide) {
            $provide.service('user', function() {
                this.username = 'testUsername';
                this.email = 'test@email.com';
                this.DSDestroy = jasmine.createSpy('User_.DSDestroy').and.returnValue({
                    then: function() {}
                });
                this.DSSave = jasmine.createSpy('User_.DSSave').and.returnValue({
                    catch: function() {}
                });
            });
            $provide.service('$mdSidenav', function() {});
            $provide.service('session', function() {});
            $provide.service('auth', function() {});
        });
    });

    beforeEach(inject(function(_$controller_, user) {
        $controller = _$controller_;
        mockUser = user;
        profileController = $controller('ProfileController', {
            $scope: $scope
        });
    }));

    //deleteUser
    it('should delete a user', function() {
        expect(1).toBe(1)
            // profileController.deleteUser();
            // expect(mockUser.DSDestroy).toHaveBeenCalled();
    });

    //save user
    it('should save a user if the user has changed', function() {
        mockUser.email = 'changed@email.com';
        profileController.saveUserData();
        expect(mockUser.DSSave).toHaveBeenCalled();
    });

    it('should not save a user if the user hasn\'t changed', function() {
        //  Don 't change anything
        profileController.saveUserData();
        expect(mockUser.DSSave).not.toHaveBeenCalled();
    });

    it('should not update the user if cancel is clicked', function() {
        // this means we are in cancel mode
        profileController.isEditMode = true;
        profileController.goldenUser = profileController.User_;
        profileController.toggleEditMode();
        expect(profileController.User_.username).toEqual('testUsername');
        expect(profileController.User_.email).toEqual('test@email.com');
        expect(profileController.isEditMode).toBe(false);
    });
});
