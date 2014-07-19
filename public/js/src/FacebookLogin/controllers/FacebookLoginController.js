angular.module('FacebookLogin').controller('FacebookLoginController',
    function($scope, FacebookLoginService, UserInformation, AUTHENTICATION_MODE, $cookies, $http) {
        $scope.model = {
            showLoginButton: false
        };

        $scope.userInformation = UserInformation.getUserInformation();

        FacebookLoginService.isFacebookReady().then(function() {
            $scope.model.showLoginButton = true;
        });

        $scope.login = function() {
            FacebookLoginService.login().then(function(response) {
                $cookies.authenticationMode = AUTHENTICATION_MODE.FACEBOOK;
                UserInformation.setUserLoggedIn(true);
                UserInformation.setFirstName(response.first_name);
                UserInformation.setLastName(response.last_name);
                UserInformation.setId(response.id);
                UserInformation.setAuthenticationMode(AUTHENTICATION_MODE.FACEBOOK);
                FacebookLoginService.getProfilePicture().then(function(data) {
                    UserInformation.setProfilePicture(data.data.url);
                    $scope.postUser();

                });
            });
        };

        // This should indeed be abstracted to model service in the real implementation
        $scope.postUser = function() {
            var data = _.clone(UserInformation.getUserInformation());
            delete data.friends;
            $http.post('/user', data).then(function(response) {
            });
        };
    });