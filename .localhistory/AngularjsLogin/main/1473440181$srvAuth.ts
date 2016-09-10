/// <reference path="../typings/index.d.ts" />
export class ServiceAuthProvider {


    static $inject = ['$rootScope'];

    private user: any;
    private rootScope: any;

    public constructor(public $rootScope: any) {
        this.rootScope = $rootScope;
    }
    private getUserInfo( ) {

        var _self = this;

        FB.api('/me', {}, function (res) {
            $rootScope.$apply(function () {
                $rootScope.user = _self.user = res;
            });
        });

    }

    public watchLoginChange(): void  {

        var _self = this;

        FB.Event.subscribe('auth.authResponseChange', function (res: any) {

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

app.factory('srvAuth',   ServiceAuthProvider ); 