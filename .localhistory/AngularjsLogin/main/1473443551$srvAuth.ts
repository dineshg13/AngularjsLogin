/// <reference path="../typings/index.d.ts" />
class ServiceAuthService {


    static $inject = ['$rootScope'];

    private user: any;

    public constructor(public $rootScope: any) {
    }
    private getUserInfo() {

        var _self = this;
        var param = { fields: 'id,name,gender,birthday,relationship_status' };

        FB.api('/me','get', param, function (res: any) {
            _self.$rootScope.$apply(function () {
                _self.$rootScope.user = _self.user = res;
                console.log("user",_self.user);
            });
        });

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
                console.log("accessToken:" , accessToken);

            } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
            } else {
                // the user isn't logged in to Facebook.
            }
        });

    }

    public watchLoginChange(): void {

        var _self = this;
        console.log("Login change");
        FB.Event.subscribe('auth.authResponseChange', function (res: any) {
            console.log("authResponseChange change");
            if (res.status === 'connected') {
                console.log("authResponseChange res.status=" + res.status);

                /*
                 The user is already logged,
                 is possible retrieve his personal info
                */
                _self.getUserInfo();

                /*
                 This is also the point where you should create a
                 session for the current user.
                 For this purpose you can use the data inside the
                 res.authResponse object.
                */

            }
            else {

                /*
                 The user is not logged to the app, or into Facebook:
                 destroy the session on the server.
                */

            }

        });

    };
}

app.service('srvAuthService', ServiceAuthService); 