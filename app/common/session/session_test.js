describe('session service', function() {

    var session, jwtHelper,
        $window;

    beforeEach(function() {
        angular.mock.module('beamer.common.session');
        angular.mock.module(function($provide) {
            jwtHelper = {};
            $provide.value('jwtHelper', jwtHelper);
        });
    });

    beforeEach(inject(function(_session_, _$window_) {
        $window = _$window_;
        $window.sessionStorage = {
            username: 'someusername'
        };
        session = _session_;
    }));

    it('should initialize a session', function() {
        expect(session.expDate).toBeUndefined();
        expect(session.userid).toBeUndefined();
        expect(session.token).toBeUndefined();
    });

    it('should create a session', function() {

        var jwtHelperSpy = jasmine.createSpyObj('jwtHelper', ['getTokenExpirationDate', 'decodeToken']);
        jwtHelperSpy.getTokenExpirationDate.and
            .returnValue('testDate');
        jwtHelperSpy.decodeToken.and
            .returnValue({
                id: 'testId'
            });

        angular.extend(jwtHelper, jwtHelperSpy);

        session.create({
            token: 'testToken',
            user: {
                username: 'testUsername'
            }
        });

        expect(jwtHelper.getTokenExpirationDate).toHaveBeenCalledWith('testToken');
        expect(jwtHelper.decodeToken).toHaveBeenCalledWith('testToken');

        expect(session.expDate).toEqual('testDate');
        expect(session.userid).toEqual('testId');
        expect(session.token).toEqual('testToken');
        expect($window.sessionStorage.username).toEqual('testUsername');
    });



    it('should destroy the session', function() {

        angular.extend(session, {
            expDate: 'testDate',
            userid: 'testId',
            token: 'testToken'
        });

        session.destroy();

        expect(session.expDate).toBeNull();
        expect(session.userid).toBeNull();
        expect(session.token).toBeNull();
        expect($window.sessionStorage.token).toBeUndefined();
        expect($window.sessionStorage.username).toBeUndefined();
    });


    it('should check if token is valid and returns the result', function() {
        session.token = "testToken";
        jwtHelper.isTokenExpired = jasmine.createSpy('isTokenExpired').and.returnValue(true);
        session.isValid();
        expect(jwtHelper.isTokenExpired).toHaveBeenCalledWith("testToken");
        expect(session.isValid()).toEqual(false);
    });

    it('should set the token if one is given', function() {
        var token = "testToken";
        session.setToken(token);
        expect(session.token).toEqual('testToken');
        expect($window.sessionStorage.token).toEqual('testToken');
    });

    it('should get the token if one is present', function() {
        $window.sessionStorage.token = 'testToken';
        expect(token).toBeUndefined();
        var token = session.getToken();
        expect(token).toEqual('testToken');
    });

});
