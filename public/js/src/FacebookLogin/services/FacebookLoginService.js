angular.module('FacebookLogin').factory('FacebookLoginService', function(Facebook,
                                                                         FACEBOOK_CONNECTION_STATUS,
                                                                         $rootScope,
                                                                         $q) {
    return {
        isFacebookReady: function() {
            var deferred = $q.defer();
            $rootScope.$watch(function() {
                return Facebook.isReady();
            }, function() {
                deferred.resolve();
            });
            return deferred.promise;
        },

        login: function() {
            var self = this;
            var deferred = $q.defer();
            Facebook.login(function(response) {
                if (response && response.status === FACEBOOK_CONNECTION_STATUS.CONNECTED) {
                    self.me().then(function(aboutMe) {
                        deferred.resolve(aboutMe);
                    });
                } else {
                    deferred.reject();
                }
            });
            return deferred.promise;
        },

        getLoginStatus: function() {
            var deferred = $q.defer();
            Facebook.getLoginStatus(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },

        me: function() {
            var deferred = $q.defer();
            Facebook.api('/me', function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },

        getProfilePicture: function() {
            var deferred = $q.defer();
            Facebook.api('/me/picture', function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        },

        logout: function() {
            var deferred = $q.defer();
            Facebook.logout(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }
    }
});