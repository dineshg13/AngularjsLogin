app.factory('serviceId', function () {
    var instance;
    // factory function body that constructs shinyNewServiceInstance
    instance.atchLoginChange = function () {

        var _self = this;

        FB.Event.subscribe('auth.authResponseChange', function (res) {

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

    }
    return instance;
});