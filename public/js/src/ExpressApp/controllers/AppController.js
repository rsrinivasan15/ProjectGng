angular.module('ExpressApp').controller('AppController', function($scope,
                                                                  UserInformation,
                                                                  $location,
                                                                  FACEBOOK_CONNECTION_STATUS,
                                                                  $cookies,
                                                                  AUTHENTICATION_MODE,
                                                                  FacebookLoginService) {
    $scope.userInformation = UserInformation.getUserInformation();

    $scope.$watch('userInformation.isLoggedIn', function(isLoggedIn) {
        if (!isLoggedIn && !$cookies.authenticationMode) {
            $location.path('/login');
        } else {
            FacebookLoginService.getLoginStatus().then(function(response) {
                if (response.status === FACEBOOK_CONNECTION_STATUS.CONNECTED) {
                    FacebookLoginService.me().then(function(response) {
                        $cookies.authenticationMode = AUTHENTICATION_MODE.FACEBOOK;
                        UserInformation.setUserLoggedIn(true);
                        UserInformation.setFirstName(response.first_name);
                        UserInformation.setLastName(response.last_name);
                        UserInformation.setAuthenticationMode(AUTHENTICATION_MODE.FACEBOOK);
                        UserInformation.setId(response.id);
                        FacebookLoginService.getProfilePicture().then(function(data) {
                            UserInformation.setProfilePicture(data.data.url);
                        });
                        $location.path('/home');
                    });
                } else {
                    $location.path('/login');
                }
            });
        }
    });

    $scope.logout = function() {
        FacebookLoginService.logout().then(function(response) {
            UserInformation.setUserLoggedIn(false);
            UserInformation.setAuthenticationMode(null);
            delete $cookies.authenticationMode;
            $location.path('/login');
        });
    };
});