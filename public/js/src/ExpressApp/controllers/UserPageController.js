angular.module('ExpressApp').controller('UserPageController', function($scope, $routeParams, $http) {
    $scope.userFacebookId = $routeParams.facebookId;
    $scope.userPageInformation = null;
    $scope.userReviews = [];

    var url = '/user?facebookId=' + $scope.userFacebookId;
    $http.get(url).then(function(response) {
        if (response && response.data) {
            $scope.userPageInformation = response.data;
        }
    });

    var reviewUrl = '/userReviews?facebookId=' + $scope.userFacebookId;
    $http.get(reviewUrl).then(function(response) {
        if (response && response.data) {
            $scope.userReviews = response.data;
        }
    });

});