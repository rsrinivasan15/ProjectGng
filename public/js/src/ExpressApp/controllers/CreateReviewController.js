angular.module('ExpressApp').controller('CreateReviewController', function($scope, $modalInstance, $http, UserInformation) {
    $scope.model = {
        reviewContent: null
    };

    $scope.create = function() {
        var data = {
            facebookId: UserInformation.getUserInformation().facebookId,
            reviewContent: $scope.model.reviewContent
        };
        $http.post('/review', data).then(function(response) {
            $modalInstance.close(response);
        })

    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
