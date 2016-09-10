
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

                appId: '1113698281990957',

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

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";

            ref.parentNode.insertBefore(js, ref);

        } (document));

    }]);