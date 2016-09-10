/// <reference path="../typings/index.d.ts" />
 class ServiceAuthService {


    static $inject = ['$rootScope'];

    private user: any;

    public constructor(public $rootScope: any) {
    }
    private getUserInfo( ) {

        var _self = this;

        FB.api('/me', {}, function (res:any) {
            _self.$rootScope.$apply(function () {
                _self.$rootScope.user = _self.user = res;
                if (res.status === 'connected') {
                    var accessToken = res.authResponse.accessToken;
                    console.log("accessToken:" + accessToken);
                } 
            });
        });


    }

    public watchLoginChange(): void  {

        var _self = this;
        console.log("Login change");
        FB.Event.subscribe('auth.authResponseChange', function (res: any) {
            console.log("Login change");
            if (res.status === 'connected') {

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

app.service('srvAuthService', ServiceAuthService ); 