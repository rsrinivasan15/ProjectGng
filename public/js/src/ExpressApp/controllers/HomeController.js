angular.module('ExpressApp').controller('HomeController', function($scope, $modal, UserInformation, $http, EVENTS) {
    $scope.reviews = [];
    $scope.createReview = function() {
        var modalInstance = $modal.open({
            templateUrl: 'js/src/ExpressApp/templates/create_review.html',
            controller: 'CreateReviewController',
            size: 'lg'
        });
    };

    $scope.userInformation = UserInformation.getUserInformation();

    var url = '/getFriendsReviews?facebookId=' + $scope.userInformation.facebookId;

    $scope.refreshReviewFeed = function() {
        $http.get(url).then(function(response) {
            $scope.reviews = response.data;
        });
    };

    $scope.$on(EVENTS.REFRESH_REVIEW_FEED, function() {
        $scope.refreshReviewFeed();
    });

    $scope.refreshReviewFeed();

});