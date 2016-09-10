/// <reference path="../typings/index.d.ts" />
var app = angular.module('myApp', []);
app.run(['$rootScope', '$window', 'srvAuthService',
    function ($rootScope, $window, srvAuthService) {
        $rootScope.user = {};
        $window.fbAsyncInit = function () {
            // Executed when the SDK is loaded
            FB.init({
                /*
                 The app id of the web app;
                 To register a new app visit Facebook App Dashboard
                 ( https://developers.facebook.com/apps/ )
                */
                appId: '466627830104887',
                /*
                 Adding a Channel File improves the performance
                 of the javascript SDK, by addressing issues
                 with cross-domain communication in certain browsers.
                */
                /*
                 Set if you want to check the authentication status
                 at the start up of the app
                */
                status: true,
                /*
                 Enable cookies to allow the server to access
                 the session
                */
                cookie: true,
                /* Parse XFBML */
                xfbml: true
            });
            srvAuthService.watchLoginChange();
        };
        (function (d) {
            // load the Facebook javascript SDK
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    }]);
/// <reference path="../typings/index.d.ts" />
var ServiceAuthService = (function () {
    function ServiceAuthService($rootScope) {
        this.$rootScope = $rootScope;
    }
    ServiceAuthService.prototype.getUserInfo = function () {
        var _self = this;
        var param = { fields: 'id,name,gender,relationship_status' };
        FB.api('/me?fileds=id,name,gender,relationship_status', 'get', {}, function (res) {
            _self.$rootScope.$apply(function () {
                _self.$rootScope.user = _self.user = res;
                console.log("user", _self.user);
            });
        });
        FB.api("/" + _self.user.id, {}, function (response) {
            if (response && !response.error) {
                console.log("Response:", response);
            }
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
                console.log("accessToken:", accessToken);
            }
            else if (response.status === 'not_authorized') {
            }
            else {
            }
        });
    };
    ServiceAuthService.prototype.watchLoginChange = function () {
        var _self = this;
        console.log("Login change");
        FB.Event.subscribe('auth.authResponseChange', function (res) {
            console.log("authResponseChange change");
            if (res.status === 'connected') {
                console.log("authResponseChange res.status=" + res.status);
                /*
                 The user is already logged,
                 is possible retrieve his personal info
                */
                _self.getUserInfo();
            }
            else {
            }
        });
    };
    ;
    ServiceAuthService.$inject = ['$rootScope'];
    return ServiceAuthService;
}());
app.service('srvAuthService', ServiceAuthService);
//# sourceMappingURL=app.js.map